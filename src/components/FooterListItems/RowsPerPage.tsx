import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
interface RowsPerPageProps {
  itemsPerPage: number;
  onItemsPerPageChange: (items: number) => void;
}

const RowsPerPage = ({
  itemsPerPage,
  onItemsPerPageChange,
}: RowsPerPageProps) => {
  return (
    <div className="flex items-center space-x-2">
      <p className="hidden text-sm font-medium sm:block">Filas por páginas</p>
      <Select
        value={String(itemsPerPage)}
        onValueChange={(value) => onItemsPerPageChange(Number(value))}
      >
        <SelectTrigger className="h-8 w-[70px]">
          <SelectValue placeholder={`${itemsPerPage}`} />
        </SelectTrigger>
        <SelectContent side="top">
          {[5, 10, 20, 30, 40, 50].map((pageSize) => (
            <SelectItem key={pageSize} value={`${pageSize}`}>
              {pageSize}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
export default RowsPerPage;
