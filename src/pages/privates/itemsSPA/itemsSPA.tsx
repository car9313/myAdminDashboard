import { ItemSPA } from "./models/itemSPA";
import useCrudQueryActions from "@/hooks/useCrudQueryActions";
import { dataApi } from "./data/dataApi";
import { useNavigate } from "react-router-dom";
import useGetActionCrud from "@/hooks/useGetActionCrud";
import { Action } from "@/interfaces/action";
import { Button } from "@/components/custom/button";
import { createItemColumns } from "./components/ItemsSPAColumns";
import AllViewItems from "@/components/AllViewItems/AllViewItems";
import { ItemSPASchemaType } from "./schemas/ItemSPAFormSchema";

const ItemsSPA = () => {
  /*   const { appliedFilters, handleApplyFilters, handleClearFilters } =
    useFilterData<ItemSPA>(); */
  const navigate = useNavigate();

  const handleAdd = () => navigate("/itemsSPA/add");
  const handleEdit = (row: ItemSPA) => navigate(`/itemsSPA/edit/${row.id}`);
  const handleView = (row: ItemSPA) => navigate(`/itemsSPA/view/${row.id}`);

  const { mutationDelete } = useCrudQueryActions<ItemSPASchemaType>({
    ...dataApi,
  });
  const handleDelete = (row: ItemSPA) => {
    mutationDelete.mutate(row.id);
  };
  const { crudActions } = useGetActionCrud<ItemSPA>({
    onView: handleView,
    onEdit: handleEdit,
    onDelete: handleDelete,
  });

  const additionalActions: Action<ItemSPA>[] = [
    ...crudActions,
    {
      label: "Duplicate",
      action: (row: ItemSPA) => {
        console.log("Duplicating item:", row);
      },
    },
  ];

  const columns = createItemColumns<ItemSPA>({
    actions: additionalActions,
  });
  /*  const defCardViewKey: DefCardViewKeyType[] = getDefCardViewKey(columns); */
  return (
    <div className="container mx-auto p-4">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">CRUD</h1>
      </div>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Button onClick={handleAdd}>Add</Button>
        </div>
        <AllViewItems<ItemSPA, undefined>
          columns={columns}
          additionalActions={additionalActions}
        />
      </div>
    </div>
  );
};
export default ItemsSPA;
