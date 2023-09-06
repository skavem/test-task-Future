import { AppDispatch } from "../store";
import { book, bookSchema, booksResponseSchema } from "./booksApiSchemas";
import { booksSlice } from "./booksReducer";

const BOOKS_API_KEY = process.env.REACT_APP_BOOKS_API_KEY ?? "";

export const sortOptions = ["relevance", "newest"];
export const categories = [
  "All",
  "Art",
  "Biography",
  "Computers",
  "History",
  "Medical",
  "Poetry",
];

const setBooks = (books: book[]) => async (dispatch: AppDispatch) => {
  dispatch(booksSlice.actions.setBooks(books));
};

const addBooks = (books: book[]) => async (dispatch: AppDispatch) => {
  dispatch(booksSlice.actions.addBooks(books));
};

const setFound = (found: number) => async (dispatch: AppDispatch) => {
  dispatch(booksSlice.actions.setFound(found));
};

export const loadBooks =
  (
    searchValue: string,
    orderBy: string,
    category: string,
    startIndex?: number
  ) =>
  async (dispatch: AppDispatch) => {
    if (searchValue.length < 1) return;
    const res = await fetch(
      "https://www.googleapis.com/books/v1/volumes?" +
        new URLSearchParams({
          key: BOOKS_API_KEY,
          q: searchValue,
          projection: "full",
          orderBy,
          maxResults: "30",
          startIndex: startIndex ? startIndex.toString() : "0",
          fields:
            "kind,items(id,etag,selfLink,volumeInfo(categories,authors,description,imageLinks,title)),totalItems",
        })
    );
    const parsedBooks = booksResponseSchema.safeParse(await res.json());

    if (!parsedBooks.success) {
      throw new Error("Error while parsing books response" + parsedBooks.error);
    }

    if (!parsedBooks.data.items) {
      dispatch(booksSlice.actions.setAllShown(true));
      return;
    }
    dispatch(booksSlice.actions.setAllShown(false));

    const filtered = parsedBooks.data.items.filter((book) => {
      if (category === categories[0]) return true;
      const bookCategories = book.volumeInfo.categories;
      return bookCategories && bookCategories.includes(category);
    });

    if (startIndex) {
      await dispatch(addBooks(filtered));
      return;
    }

    await dispatch(setBooks(filtered));
    await dispatch(setFound(parsedBooks.data.totalItems));
  };

export const clearBooks = () => async (dispatch: AppDispatch) => {
  dispatch(booksSlice.actions.clearBooks());
};

export const getBook = async (id: string, abort: AbortController) => {
  try {
    const res = await fetch(
      `https://www.googleapis.com/books/v1/volumes/${id}?` +
        new URLSearchParams({
          key: BOOKS_API_KEY,
          fields:
            "id,etag,selfLink,volumeInfo(categories,authors,description,imageLinks,title)",
        }),
      { signal: abort.signal }
    );

    const parsedBook = bookSchema.parse(await res.json());

    return parsedBook;
  } catch (e) {
    return null;
  }
};
