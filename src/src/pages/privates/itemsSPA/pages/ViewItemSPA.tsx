import CardViewContent from "@/components/CardView/CardViewContent";
import { getItemID } from "@/services/crudGenericFormApi";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { ItemSPA } from "../models/itemSPA";
import { colDef } from "../data/colDef";

const ViewItemSPA = () => {
  const { id } = useParams(); // Usamos useParams para obtener el id del ítem
  const endPoint = `items/${id}`;
  const { data } = useQuery({
    queryKey: ["itemSPA"],
    queryFn: () => getItemID<ItemSPA>({ id, endPoint }),
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Detalles del Item</h1>

      {!id ? (
        <p>No existen datos</p>
      ) : !data ? (
        <p>No se pudo obtener los datos</p>
      ) : (
        <CardViewContent<ItemSPA> data={data} defCardViewKey={colDef} />
      )}
    </div>
  );
};
export default ViewItemSPA;
