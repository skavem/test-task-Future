import { z } from "zod";

export const bookSchema = z.object({
  id: z.string(),
  etag: z.string(),
  selfLink: z.string(),
  volumeInfo: z.object({
    mainCategory: z.optional(z.string()).optional(),
    authors: z.array(z.string()).optional(),
    title: z.string(),
    description: z.string().optional(),
    categories: z.array(z.string()).optional(),
    imageLinks: z
      .object({
        medium: z.string().optional(),
        smallThumbnail: z.string(),
        thumbnail: z.string(),
      })
      .optional(),
  }),
});

export type book = z.infer<typeof bookSchema>;

export const booksResponseSchema = z.object({
  kind: z.string(),
  totalItems: z.number(),
  items: z.array(bookSchema).optional(),
});

export type booksResponse = z.infer<typeof booksResponseSchema>;
