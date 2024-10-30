import DataActions from "@/components/dataActions/DataActions";
import { Item } from "../models/item";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DataActionsProps } from "@/interfaces/action";

const CardItem = ({ itemSelected, actions }: DataActionsProps<Item>) => {
  return (
    <Card key={itemSelected.id} className="hover:shadow-md">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
      </CardHeader>
      <CardContent>
        <>
          <p className="line-clamp-2 text-gray-500">
            Name: {itemSelected.name}
          </p>
          <p className="line-clamp-2 text-gray-500"></p>
        </>
      </CardContent>
      <CardFooter className="relative flex justify-end">
        {actions && (
          <DataActions itemSelected={itemSelected} actions={actions} />
        )}
      </CardFooter>
    </Card>
  );
};

export default CardItem;
{
}
