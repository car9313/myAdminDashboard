import {
  ChevronLeft,
  ChevronLeftCircle,
  ChevronRight,
  ChevronRightCircle,
} from "lucide-react";
import { useState } from "react";
import { Button } from "../custom/button";
import { Input } from "../ui/input";

interface PaginationProps {
  currentPage: number;
  pageSize: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const [inputPage, setInputPage] = useState<string>("");
  const handlePrevious = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputPage(e.target.value);
  };

  const handleGoToPage = () => {
    const targetPage = Number(inputPage);
    onPageChange(targetPage);
    setInputPage(""); // Limpiar el input después de navegar
  };

  return (
    <div className="flex flex-col-reverse md:flex-row items-center md:justify-between gap-2">
      <span className="text-sm font-medium flex-1">
        Página {currentPage} de {totalPages}
      </span>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          className="border border-gray-300 hover:bg-gray-200"
          disabled={currentPage === 1}
          onClick={handlePrevious}
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>

        {/* Input para Navegación Directa */}
        <div className="flex items-center gap-2">
          <Input
            type="number"
            placeholder="Ir"
            min={1}
            max={totalPages}
            value={inputPage}
            onChange={handleInputChange}
            className="w-16 text-center"
          />
          <Button
            variant="outline"
            size="sm"
            disabled={
              isNaN(Number(inputPage)) ||
              Number(inputPage) < 1 ||
              Number(inputPage) > totalPages ||
              Number(inputPage) === currentPage
            }
            className="border border-gray-300 hover:bg-gray-200"
            onClick={handleGoToPage}
          >
            Ir
          </Button>
        </div>

        <Button
          variant="outline"
          size="sm"
          className="border border-gray-300 hover:bg-gray-200"
          disabled={currentPage === totalPages}
          onClick={handleNext}
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
