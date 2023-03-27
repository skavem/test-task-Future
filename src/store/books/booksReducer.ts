import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { GoogleBook } from "../../types"

export type book = GoogleBook

interface BooksSlice {
  items: book[],
  found: number
}

const initialState: BooksSlice = {
  items: [],
  found: 0
}

export const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setBooks(state, action: PayloadAction<book[]>) {
      state.items = action.payload
    },
    clearBooks(state) {
      state.items = []
      state.found = 0
    },
    addBooks(state, action: PayloadAction<book[]>) {
      state.items = [...state.items, ...action.payload]
    },
    setFound(state, action: PayloadAction<number>) {
      state.found = action.payload
    },
  }
})

export default booksSlice.reducer