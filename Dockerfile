# ==== CONFIGURE =====
FROM node:19-alpine as builder
LABEL stage=builder
WORKDIR /app
COPY . .
# ==== BUILD =====
ARG BOOKS_API_KEY
ENV REACT_APP_BOOKS_API_KEY=$REACT_APP_BOOKS_API_KEY
RUN npm ci 
RUN npm run build

# ==== CONFIGURE =====
FROM nginx:1.23.3-alpine as production
LABEL app=quotewind
ENV NODE_ENV production
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
# ==== RUN =====
CMD ["nginx", "-g", "daemon off;"]