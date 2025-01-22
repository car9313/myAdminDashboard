import { ItemSPA, ItemSPA as Model } from "./models/itemSPA";
import { dataApi } from "./data/dataApi";
import { useMemo } from "react";
import { getColumnsGeneric } from "@/components/dataTable/DataTableColumns";
import CrudContainer from "@/components/Crud/CrudContainer";
import { ConfirmDialog } from "@/components/confirm-dialog";
import ViewToggle from "@/components/viewToggle/ViewToggle";
import { Button } from "@/components/custom/button";
import useSPAActionCrud from "@/hooks/crud/useSPAActionCrud";
import useViewModeCrud from "@/hooks/crud/useViewModeCrud";
import { colDef } from "./data/colDef";
import useGetActionCrud from "@/hooks/useGetActionsWithPermissions";
import AllViewItems from "@/components/AllViewItems/AllViewItems";
import { IconCirclePlus } from "@tabler/icons-react";

const ItemsSPA = () => {
  const {
    isConfirmOpen,
    crudActions,
    closeModalConfirm,
    handleAdd,
    handleDelete,
  } = useSPAActionCrud<Model>({ dataApi: dataApi });

  const { listActions = [], hasPermission } = useGetActionCrud<Model>({
    resource: "ItemSPA",
    actions: crudActions,
  });
  const columns = useMemo(
    () => getColumnsGeneric<Model>({ actions: listActions, colDef }),
    [colDef]
  );

  return (
    <CrudContainer>
      <div className="flex justify-between items-center ">
        <div className="flex gap-2 flex-1 items-center justify-start">
          {hasPermission(["create"]) && (
            <Button onClick={handleAdd}>
              <IconCirclePlus />
              Insertar
            </Button>
          )}
        </div>
      </div>
      <AllViewItems<Model, undefined>
        listActions={listActions}
        viewModeCrud="optional"
        colDef={colDef}
      />

      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={closeModalConfirm}
        onConfirm={handleDelete}
        title="Confirm Deletion"
        description="Are you sure you want to delete this user? This action cannot be undone."
      />
    </CrudContainer>
  );
};
export default ItemsSPA;
