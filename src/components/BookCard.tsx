import { Link } from "react-router-dom";
import PictureSkeleton from "../icons/PictureSkeleton";
import { book } from "../store/books/booksApiSchemas";

const BookCard = (book: book) => {
  const categories = book.volumeInfo.categories ?? null;
  const category =
    book.volumeInfo.mainCategory ?? (categories ? categories[0] : null);
  const images = book.volumeInfo.imageLinks;

  return (
    <article className="w-56 flex flex-col">
      <Link
        to={`book/${book.id}`}
        className="overflow-hidden flex-1 flex flex-col justify-center m-2 bg-slate-100 p-5 gap-1 drop-shadow-sm"
      >
        <div className="flex justify-center">
          {images ? (
            <div
              style={{
                backgroundImage: `url('${images.thumbnail}'`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "100% 100%",
              }}
              className="h-60 w-40"
            />
          ) : (
            <PictureSkeleton className="h-60 w-40" />
          )}
        </div>
        {category ? <h1>{category}</h1> : <></>}
        <h2 className="font-bold mb-auto">{book.volumeInfo.title}</h2>
        <p className="text-slate-500">
          {new Intl.ListFormat("en-US").format(book.volumeInfo.authors ?? "")}
        </p>
      </Link>
    </article>
  );
};

export default BookCard;
