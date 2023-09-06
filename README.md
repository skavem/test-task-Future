# Тестовое задание на позицию frontend разработчика

Репозиторий с выполнением тестового задания от компании Фьюче

## Деплой

Добавить в .env ключ от Api Google Books в REACT_APP_BOOKS_API_KEY

```
docker build -t google-books-api .

docker run -dp 8789:80 google-books-api
```