import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  }
const Pagination = ({
    currentPage,
    totalPages,
    onPageChange,
  }:PaginationProps) => {
    const handlePrevious = () => {
        if (currentPage > 1) {
          onPageChange(currentPage - 1);
        }
      };
      const handleNext = () => {
        if (currentPage < totalPages) {
          onPageChange(currentPage + 1);
        }
      };
    
      const handlePageClick = (page: number) => {
        onPageChange(page);
      };
  return (
    <div className="flex items-center justify-center space-x-2 mt-4">
      <Button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        variant="outline"
      >
        Previous
      </Button>
      {Array.from({ length: totalPages }, (_, index) => (
        <Button
          key={index}
          onClick={() => handlePageClick(index + 1)}
          variant={currentPage === index + 1 ? "default" : "outline"}
          className={cn("transition-colors", currentPage === index + 1 ? "bg-blue-500 text-white" : "text-blue-500")}
        >
          {index + 1}
        </Button>
      ))}
      <Button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        variant="outline"
      >
        Next
      </Button>
    </div>
  )
}

export default Pagination