import { useCallback, useState } from "react";
import { Route } from "react-router";
import { Routes, useNavigate } from "react-router-dom";
import "./App.css";
import BookList from "./components/BookList";
import BookPage from "./components/BookPage";
import HeaderSearch from "./components/HeaderSearch";
import { categories, loadBooks, sortOptions } from "./store/books/booksAPI";
import { useAppDispatch } from "./store/hooks";

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);

  const [orderBy, setOrderBy] = useState(sortOptions[0]);
  const [curCategory, setCurCategory] = useState(categories[0]);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const getBooks = useCallback(
    async (startIndex?: number) => {
      navigate("/");
      setLoading(true);
      await dispatch(loadBooks(searchValue, orderBy, curCategory, startIndex));
      setLoading(false);
    },
    [searchValue, dispatch, setLoading, orderBy, curCategory, navigate]
  );

  return (
    <main>
      <section>
        <HeaderSearch
          curCategory={curCategory}
          setCurCategory={setCurCategory}
          orderBy={orderBy}
          setOrderBy={setOrderBy}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          getBooks={getBooks}
        />

        <Routes>
          <Route
            path="/"
            element={<BookList loading={loading} getBooks={getBooks} />}
          />
          <Route path="book/:id" element={<BookPage />} />
        </Routes>
      </section>
    </main>
  );
}

export default App;
