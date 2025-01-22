import { Skeleton } from "../ui/skeleton";

const FormSkeleton = () => {
  return (
    <div className="space-y-4">
      {/* Inputs simulados */}
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index}>
          <Skeleton className="h-4 bg-gray-300 rounded-md w-1/3 mb-2" />
          <Skeleton className="h-8 bg-gray-300 rounded-md w-full" />
        </div>
      ))}
      {/* Botones simulados */}
      <div className="flex space-x-2">
        <Skeleton className="h-10 bg-gray-300 rounded-md w-24" />
        <Skeleton className="h-10 bg-gray-300 rounded-md w-24" />
      </div>
    </div>
  );
};
export default FormSkeleton;
