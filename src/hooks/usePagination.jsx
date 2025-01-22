import { useState } from "react";

const usePagination = (initialPage = 1, itemsPerPage = 10) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [itemsPerPageState, setItemsPerPage] = useState(itemsPerPage);

  const nextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const setPage = (page) => {
    setCurrentPage(page);
  };

  const setItemsPerPageStateFn = (items) => {
    setItemsPerPage(items);
  };

  return {
    currentPage,
    itemsPerPageState,
    nextPage,
    prevPage,
    setPage,
    setItemsPerPageStateFn,
  };
};

export default usePagination;
