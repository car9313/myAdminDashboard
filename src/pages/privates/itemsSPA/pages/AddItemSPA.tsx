import ItemsSPACrudForm from "../components/ItemsSPACrudForm";

const AddItemSPA = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Agregar Nuevo Item</h1>
      <ItemsSPACrudForm modalMode="add" />
    </div>
  );
};
export default AddItemSPA;
