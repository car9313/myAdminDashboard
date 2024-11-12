import { Skeleton } from "../ui/skeleton";

const DataTableSkeleton = () => {
  return (
    <div className="space-y-4">
      {/* Simula la cabecera de la tabla */}
      <div className="flex justify-center items-center gap-2">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-6 w-20" />
        <Skeleton className="h-6 w-28" />
      </div>
      {/* Simula varias filas de la tabla */}
      {[...Array(5)].map((_, index) => (
        <div key={index} className="flex justify-center items-center gap-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-28" />
        </div>
      ))}
    </div>
  );
};
export default DataTableSkeleton;
