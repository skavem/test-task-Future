import { categories, clearBooks, sortOptions } from "../store/books/booksAPI";
import { useAppDispatch } from "../store/hooks";
import SearchInput from "./SearchInput";
import SelectInput from "./SelectInput";

const HeaderSearch = ({
  searchValue,
  setSearchValue,
  orderBy,
  setOrderBy,
  curCategory,
  setCurCategory,
  getBooks,
}: {
  searchValue: string;
  setSearchValue: (value: string) => void;
  orderBy: string;
  setOrderBy: (value: string) => void;
  curCategory: string;
  setCurCategory: (value: string) => void;
  getBooks: (startIndex?: number) => Promise<void>;
}) => {
  const dispatch = useAppDispatch();

  return (
    <div className="bg-[linear-gradient(rgba(0,0,0,0.60),rgba(0,0,0,0.60)),url('img/search-background.png')] [background-size:cover] bg-center flex flex-col gap-4 items-center p-5">
      <h1 className="text-slate-50 text-5xl pb-3">Search for books</h1>
      <SearchInput
        inputValue={searchValue}
        onInputChange={(e) => setSearchValue(e.target.value)}
        onSearch={() => {
          dispatch(clearBooks());
          getBooks();
        }}
      />
      <div className="flex flex-col md:flex-row w-full justify-center gap-5">
        <SelectInput
          className="md:w-1/4 gap-3"
          options={sortOptions}
          setValue={setOrderBy}
          value={orderBy}
          label={"Sort by"}
        />
        <SelectInput
          className="md:w-1/4 gap-3"
          options={categories}
          setValue={setCurCategory}
          value={curCategory}
          label={"Category"}
        />
      </div>
    </div>
  );
};

export default HeaderSearch;
