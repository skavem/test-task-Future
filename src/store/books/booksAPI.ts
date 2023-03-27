import { GoogleBook, GoogleBooks } from "../../types";
import { AppDispatch } from "../store";
import { book, booksSlice } from "./booksReducer";

const BOOKS_API_KEY = process.env.REACT_APP_BOOKS_API_KEY ?? ''

export const sortOptions = ['relevance', 'newest']
export const categories = ['All', 'Art', 'Biography', 'Computers', 'History', 'Medical', 'Poetry']

const setBooks = (
  books: book[]
) => async (dispatch: AppDispatch) => {
  dispatch(booksSlice.actions.setBooks(books))
}

const addBooks = (
  books: book[]
) => async (dispatch: AppDispatch) => {
  dispatch(booksSlice.actions.addBooks(books))
}


const setFound = (
  found: number
) => async (dispatch: AppDispatch) => {
  dispatch(booksSlice.actions.setFound(found))
}

export const loadBooks = (
  searchValue: string,
  orderBy: string,
  category: string,
  startIndex?: number
) => async (dispatch: AppDispatch) => {
  if (searchValue.length < 1) return
  const result = await fetch(
    'https://www.googleapis.com/books/v1/volumes?' 
      + new URLSearchParams({
        key: BOOKS_API_KEY,
        q: searchValue,
        projection: 'full',
        orderBy,
        maxResults: '30',
        startIndex: startIndex ? startIndex.toString() : '0'
      })
  )
  const books: GoogleBooks = await result.json()

  const filtered = books.items.filter(book => {
    if (category === categories[0]) return true
    const bookCategories = book.volumeInfo.categories
    return bookCategories && bookCategories.includes(category)
  })

  if (startIndex) {
    await dispatch(addBooks(filtered))
    return
  }
  
  await dispatch(setBooks(filtered))
  await dispatch(setFound(books.totalItems))
}

export const clearBooks = () => async (
  dispatch: AppDispatch
) => {
  dispatch(booksSlice.actions.clearBooks())
}

export const getBook = async (
  id: string,
  abort: AbortController
) => {
  try {
    const result = await fetch(
      `https://www.googleapis.com/books/v1/volumes/${id}?`
        + new URLSearchParams({
          key: BOOKS_API_KEY,
        }),
      { signal: abort.signal }
    )
    const ans = await result.json()
    if ('error' in ans) {
      return null
    }
    return ans as GoogleBook
  } catch (e) {
  }
}