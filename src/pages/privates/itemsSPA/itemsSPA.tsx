import { ItemSPA } from "./models/itemSPA";
import useCrudQueryActions from "@/hooks/useCrudQueryActions";
import { dataApi } from "./data/dataApi";
import { useNavigate } from "react-router-dom";
import useGetActionCrud from "@/hooks/useGetActionCrud";
import AllViewItems from "@/components/AllViewItems/AllViewItems";
import { ItemSPASchemaType } from "./schemas/ItemSPAFormSchema";
import { itemActionsList } from "@/data/itemCrudActionsList";
import { useMemo } from "react";
import { getColumnsGeneric } from "@/components/dataTable/DataTableColumns";
import { colDef } from "./data/colDef";
import CrudContainer from "@/components/Crud/CrudContainer";
import CrudHeader from "@/components/Crud/CrudHeader";
const ItemsSPA = () => {
  /*   const { appliedFilters, handleApplyFilters, handleClearFilters } =
    useFilterData<ItemSPA>(); */
  const navigate = useNavigate();

  const handleAdd = () => navigate("/itemsSPA/add");
  const handleEdit = ({ item }: { item: ItemSPA }) =>
    navigate(`/itemsSPA/edit/${item.id}`);
  const handleView = ({ item }: { item: ItemSPA }) =>
    navigate(`/itemsSPA/view/${item.id}`);

  const { mutationDelete } = useCrudQueryActions<ItemSPASchemaType>({
    ...dataApi,
  });
  const handleDelete = (row: ItemSPA) => {
    mutationDelete.mutate(row.id);
  };
  const { listActions } = useGetActionCrud<ItemSPA>({
    onView: handleView,
    onEdit: handleEdit,
    onDelete: handleDelete,
    resource: "ItemSPA",
    actionsList: itemActionsList,
  });
  const columns = useMemo(
    () => getColumnsGeneric<ItemSPA>({ actions: listActions, colDef }),
    [colDef]
  );

  return (
    <CrudContainer>
      <CrudHeader title="CRUD" nameAction="Add" onAdd={handleAdd} />
      <AllViewItems<ItemSPA, undefined>
        columns={columns}
        listActions={listActions}
        dataApi={dataApi}
      />
    </CrudContainer>
  );
};
export default ItemsSPA;
