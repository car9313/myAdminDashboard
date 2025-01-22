import { useEffect, useState } from "react";

const usePagination = <T>({ appliedFilters }: { appliedFilters?: T }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  useEffect(() => {
    setCurrentPage(1);
  }, [appliedFilters]);

  // Manejador para el cambio de tamaño de página
  const handlePageSizeChange = (value: number) => {
    setPageSize(value);
    setCurrentPage(1); // Reinicia a la primera página
  };
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };
  return {
    currentPage,
    pageSize,
    handlePageChange,
    handlePageSizeChange,
  };
};

export default usePagination;
