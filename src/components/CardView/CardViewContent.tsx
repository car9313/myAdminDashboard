
import { ColDefType } from "@/interfaces/colDef";
import { CardContent } from "../ui/card";
import { formatValue, getProperty } from "@/utils/utilities";

interface CardViewContentProps<T> {
    data: T;
    columnsDef:ColDefType
  }
const CardViewContent = <T extends object>({data,columnsDef}:CardViewContentProps<T>) => {
  return (
    Object.keys(columnsDef).map((key) => {
        const value = getProperty(data, key as keyof T);
        return (
          <CardContent
            key={key}
            className="flex flex-col items-start justify-center gap-2"
          >
            <>
              <p className="line-clamp-2 text-gray-500">
                {columnsDef[key]}: {formatValue(value)}
              </p>
            </>
          </CardContent>
        );
      })
  )
}

export default CardViewContent