import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { book } from "./booksApiSchemas";

interface BooksSlice {
  items: book[];
  found: number;
  allShown: boolean;
}

const initialState: BooksSlice = {
  items: [],
  found: 0,
  allShown: true,
};

export const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    setBooks(state, action: PayloadAction<book[]>) {
      state.items = action.payload;
    },
    clearBooks(state) {
      state.items = [];
      state.found = 0;
    },
    addBooks(state, action: PayloadAction<book[]>) {
      state.items = [...state.items, ...action.payload];
    },
    setFound(state, action: PayloadAction<number>) {
      state.found = action.payload;
    },
    setAllShown(state, action: PayloadAction<boolean>) {
      state.allShown = action.payload;
    },
  },
});

export default booksSlice.reducer;
