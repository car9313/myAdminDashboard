import { Card, CardFooter, CardHeader, CardTitle } from "../ui/card";
import CardViewContent from "./CardViewContent";
import { Action } from "@/interfaces/action";
import DataActions from "../dataActions/DataActions";
import { DefCardViewKeyType } from "@/interfaces/colDef";
import { ColumnDef } from "@tanstack/react-table";
import { getDefCardViewKey } from "@/utils/utilities";

interface CardViewProps<T> {
  data: T[]; // Arreglo de objetos de datos
  className?: string;
  columnsDef: ColumnDef<T>[];
  actions?: Action<T>[];
}
const ListCardView = <T,>({
  data,
  className,
  columnsDef,
  actions,
}: CardViewProps<T>) => {
  const defCardViewKey: DefCardViewKeyType[] = getDefCardViewKey(columnsDef);
  return (
    <div className="faded-bottom no-scrollbar grid gap-4 overflow-auto pb-16 pt-4 md:grid-cols-2 lg:grid-cols-3">
      {data.length > 0 ? (
        data.map((item) => (
          <Card className={`${className}`}>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
            </CardHeader>
            <CardViewContent<T> data={item} defCardViewKey={defCardViewKey} />
            <CardFooter className="relative flex justify-end">
              {actions && <DataActions itemSelected={item} actions={actions} />}
            </CardFooter>
          </Card>
        ))
      ) : (
        <p className="text-center text-red-500">
          No existen elementos para mostrar
        </p>
      )}
    </div>
  );
};

export default ListCardView;
