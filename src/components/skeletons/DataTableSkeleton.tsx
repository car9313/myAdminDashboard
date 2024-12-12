import CrudContainer from "../Crud/CrudContainer";
import { Skeleton } from "../ui/skeleton";

const DataTableSkeleton = () => {
  return (
    <CrudContainer>
      <div className="space-y-4">
        {/* Simula la cabecera de la tabla */}
        <div className="flex justify-center items-center gap-2">
          <Skeleton className="h-6 w-1/5" />
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-6 w-1/6" />
          <Skeleton className="h-6 w-1/4" />
        </div>
        {/* Simula varias filas de la tabla */}
        {[...Array(5)].map((_, index) => (
          <div key={index} className="flex justify-center items-center gap-2">
            <Skeleton className="h-6 w-1/5" />
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-6 w-1/6" />
            <Skeleton className="h-6 w-1/4" />
          </div>
        ))}
      </div>
    </CrudContainer>
  );
};
export default DataTableSkeleton;
