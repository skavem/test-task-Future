import LoaderIcon from "../icons/LoaderIcon";
import { useAppSelector } from "../store/hooks";
import { pluralise } from "../utils";
import BookCard from "./BookCard";
import { GetBooksButton } from "./GetBooksButton";

const BookList = ({
  loading,
  getBooks,
}: {
  loading: boolean;
  getBooks: (startIndex?: number) => Promise<void>;
}) => {
  const booksFound = useAppSelector((s) => s.books.found);
  const books = useAppSelector((s) => s.books.items);

  return (
    <div className="flex items-center w-full flex-col gap-3 py-3">
      <p className="text-xl w-full text-center">
        {pluralise(booksFound, "book")} found
      </p>

      <div className="flex justify-center flex-wrap w-3/4">
        {books.map((book) => (
          <BookCard {...book} key={book.id} />
        ))}
      </div>

      {loading ? (
        <LoaderIcon className="w-8 h-8 text-slate-300 animate-spin fill-slate-900" />
      ) : (
        <></>
      )}

      <GetBooksButton onClick={() => getBooks(books.length)} />
    </div>
  );
};

export default BookList;
