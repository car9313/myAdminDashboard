import React, { ReactNode } from "react";
import Pagination from "../FooterListItems/Pagination";
import RowsPerPage from "../FooterListItems/RowsPerPage";
interface ContainerWithPaginationProps {
  total: number | undefined;
  currentPage: number;
  pageSize: number;
  onPageChange: (newPage: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  children: ReactNode;
}

const ContainerWithPagination = ({
  total,
  currentPage,
  pageSize,
  onPageChange,
  onPageSizeChange,
  children,
}: ContainerWithPaginationProps) => {
  return (
    <>
      {children}
      {total !== undefined && total > 0 && (
        <div className="flex gap-2 flex-col-reverse lg:flex-row items-center lg:justify-between justify-center overflow-auto px-2">
          <span className="text-sm text-muted-foreground">
            Total de elementos: {total}
          </span>
          <Pagination
            currentPage={currentPage}
            pageSize={pageSize}
            totalPages={Math.ceil(total / pageSize)}
            onPageChange={onPageChange}
          />
          <RowsPerPage
            itemsPerPage={pageSize}
            onItemsPerPageChange={onPageSizeChange}
          />
        </div>
      )}
    </>
  );
};

export default ContainerWithPagination;
