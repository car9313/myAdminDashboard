import { useParams } from "react-router-dom";
import ItemsSPACrudForm from "../components/CrudForm";
import { useQuery } from "@tanstack/react-query";
import { ItemSPA } from "../models/itemSPA";
import { getItemID } from "@/services/crudGenericFormApi";
import Loader from "@/components/loader";

const EditItemSPA = () => {
  const { id } = useParams<{ id: string }>();
  const endPoint = `items/${id}`;
  const {
    data: currentItem,
    isLoading,
    error,
    isSuccess,
  } = useQuery({
    queryKey: ["itemSPA"],
    queryFn: async () => await getItemID<ItemSPA>({ id, endPoint }),
  });
  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    <p>Ha ocurrido un error al cargar el elemento seleccionado</p>;
  }
  if (isSuccess) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Editar Item</h1>
        <ItemsSPACrudForm modalMode="edit" currentItem={currentItem} />
      </div>
    );
  }
};
export default EditItemSPA;
