import React from "react";
import { useAppSelector } from "../store/hooks";

export const GetBooksButton = ({
  onClick,
}: {
  onClick: React.MouseEventHandler;
}) => {
  const allBooksShown = useAppSelector((s) => s.books.allShown);
  return (
    <>
      {!allBooksShown ? (
        <button
          type="button"
          className="bg-slate-700 text-white rounded-md p-3"
          onClick={onClick}
        >
          Load more
        </button>
      ) : (
        <></>
      )}
    </>
  );
};
