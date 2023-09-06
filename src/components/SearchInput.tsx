import React from "react";
import SearchIcon from "../icons/SearchIcon";

const SearchInput = ({
  onInputChange,
  inputValue,
  onSearch,
  ...props
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputValue: string;
  onSearch: () => void;
}) => {
  return (
    <div className="relative w-full md:w-2/3">
      <input
        type="search"
        className="block p-2.5 rounded-md w-full text-sm text-gray-900 focus-visible:outline-none border-none"
        placeholder="Search"
        required
        value={inputValue}
        onChange={onInputChange}
        onKeyDown={(e) => {
          if (e.key === "Enter") onSearch();
        }}
      />
      <button
        type="button"
        className="absolute top-0 right-0 p-2.5 text-slate-500 hover:text-black z-10"
        onClick={onSearch}
      >
        <SearchIcon className="w-5 h-5" />
      </button>
    </div>
  );
};

export default SearchInput;
