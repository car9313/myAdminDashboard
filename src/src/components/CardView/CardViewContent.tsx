import { formatValue, getProperty } from "@/utils/utils";
import { CardContent } from "../ui/card";
import { DefCardViewKeyType } from "@/interfaces/colDef";
interface CardViewContentProps<T> {
  data: T | undefined;
  defCardViewKey: DefCardViewKeyType[];
}
const CardViewContent = <T,>({
  data,
  defCardViewKey,
}: CardViewContentProps<T>) => {
  if (!data) {
    return <p>No se puede mostrar la información del elemento seleccionado.</p>;
  }
  return defCardViewKey.map((key) => {
    const value = getProperty(data, key.id as keyof T);
    return (
      <CardContent
        key={key.id}
        className="flex flex-col items-start justify-center gap-2"
      >
        <>
          {key.title && (
            <p className="line-clamp-2 text-gray-500">
              {key.title}: {formatValue(value)}
            </p>
          )}
        </>
      </CardContent>
    );
  });
};

export default CardViewContent;
