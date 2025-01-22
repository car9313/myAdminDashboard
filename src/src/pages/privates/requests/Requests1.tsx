import GenericCrudModal from "@/components/Crud/modal/GenericCrudModal";
import { dataApi } from "./data/dataApi";
import { columns } from "./components/Columns";
import FilterForm from "./components/FilterForm";
import DynamicModal from "./components/DynamicModal";

const Requests1 = () => {
  return (
    <GenericCrudModal
      title="Gestion de Solicitudes"
      dataApi={dataApi}
      columns={columns}
      FilterComponent={FilterForm}
      ModalComponent={DynamicModal}
    />
  );
};

export default Requests1;
