import { Card, CardFooter, CardHeader, CardTitle } from "../ui/card";
import CardViewContent from "./CardViewContent";

import { Action } from "@/interfaces/action";
import DataActions from "../dataActions/DataActions";
import { ColDefType } from "@/interfaces/colDef";


interface CardViewProps<T> {
  data: T[]; // Arreglo de objetos de datos
  className?:string;
  columnsDef:ColDefType
  actions?:Action<T>[]
}

const ListCardView = <T extends object>({ data,className,columnsDef,actions }: CardViewProps<T>) => {
  return (
    <div className="faded-bottom no-scrollbar grid gap-4 overflow-auto pb-16 pt-4 md:grid-cols-2 lg:grid-cols-3">
      {data.map((item, index) => (
        <Card className={`${className}`}>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
        </CardHeader>
         <CardViewContent data={data} columnsDef={columnsDef} />
       <CardFooter className="relative flex justify-end">
          {actions && <DataActions itemSelected={item} actions={actions} />}
        </CardFooter> 
      </Card>
      ))}
    </div>
  );
};

export default ListCardView;
