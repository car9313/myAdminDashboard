import ContainerFormItem from "@/components/Crud/spa/ContainerFormItem";
import ItemsSPACrudForm from "../components/CrudForm";

const AddItemSPA = () => {
  return (
    <ContainerFormItem title="Agregar Nuevo Item">
      <ItemsSPACrudForm modalMode="add" />
    </ContainerFormItem>
  );
};
export default AddItemSPA;
