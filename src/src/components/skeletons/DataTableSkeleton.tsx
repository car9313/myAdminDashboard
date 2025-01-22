import CrudContainer from "../Crud/CrudContainer";
import { Skeleton } from "../ui/skeleton";

interface DataTableSkeletonProps {
  rowCount?: number; // Número de filas en el skeleton
  columnCount?: number; // Número de columnas en el skeleton
  columnWidths?: string[]; // Anchos personalizados para las columnas (prioridad sobre columnCount)
}

const DataTableSkeleton: React.FC<DataTableSkeletonProps> = ({
  rowCount = 5, // Número de filas por defecto
  columnCount = 4, // Número de columnas por defecto
  columnWidths, // Anchos personalizados para las columnas
}) => {
  const columns =
    columnWidths && columnWidths.length > 0
      ? columnWidths // Usa anchos personalizados si están definidos
      : Array(columnCount).fill("w-4/" + columnCount); // Genera clases Tailwind dinámicamente

  return (
    <CrudContainer>
      <div className="space-y-4">
        {/* Simula la cabecera de la tabla */}
        <div className="flex justify-center items-center gap-2">
          {columns.map((width, index) => (
            <Skeleton key={`header-${index}`} className={`h-6 ${width}`} />
          ))}
        </div>
        {/* Simula varias filas de la tabla */}
        {[...Array(rowCount)].map((_, rowIndex) => (
          <div
            key={`row-${rowIndex}`}
            className="flex justify-center items-center gap-2"
          >
            {columns.map((width, colIndex) => (
              <Skeleton
                key={`row-${rowIndex}-col-${colIndex}`}
                className={`h-6 ${width}`}
              />
            ))}
          </div>
        ))}
      </div>
    </CrudContainer>
  );
};

export default DataTableSkeleton;
