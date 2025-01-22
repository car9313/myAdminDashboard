import { useParams } from "react-router-dom";
import ItemsSPACrudForm from "../components/CrudForm";
import { useQuery } from "@tanstack/react-query";
import { ItemSPA } from "../models/itemSPA";
import { getItemID } from "@/services/crudGenericFormApi";
import Loader from "@/components/loader";
import ContainerFormItem from "@/components/Crud/spa/ContainerFormItem";

const EditItemSPA = () => {
  const { id } = useParams();
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
      <ContainerFormItem title="Editar Item">
        <ItemsSPACrudForm modalMode="edit" currentItem={currentItem} />
      </ContainerFormItem>
    );
  }
};
export default EditItemSPA;
