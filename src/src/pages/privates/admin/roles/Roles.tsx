import { Role } from "@/interfaces/auth";
import { RolFormSchema } from "./schemas/rolSchema";
import useCrudQueryActions from "@/hooks/useCrudQueryActions";
import useManagerModalDatatable from "@/hooks/crud/modal/useManagerModal";
import { dataApi } from "./data/dataApi";
import useGetActionCrud from "@/hooks/useGetActionsWithPermissions";
import { useMemo } from "react";
import { getColumnsGeneric } from "@/components/dataTable/DataTableColumns";
import { colDef } from "./data/colDef";
import { Button } from "@/components/custom/button";
import AllViewItems from "@/components/AllViewItems/AllViewItems";
import WindowsModal from "@/components/modal/WindowsModal";
import CardViewContent from "@/components/CardView/CardViewContent";
import { itemActionsList } from "@/data/itemCrudActionsList";

const Roles = () => {
  const {
    isModalOpen,
    currentItem,
    modalMode,
    handleOpenModal,
    handleCloseModal,
    title,
  } = useManagerModalDatatable<Role>();

  const { mutationDelete } = useCrudQueryActions<RolFormSchema>({
    ...dataApi,
  });
  const handleDelete = (row: Role) => {
    mutationDelete.mutate(row.id);
  };
  const { listActions } = useGetActionCrud<Role>({
    onView: handleOpenModal,
    onEdit: handleOpenModal,
    onDelete: handleDelete,
    resource: "Role",
    actionsList: itemActionsList,
    additionalActions: [
      {
        label: "Aprobar",
        action: (row) => {
          /* Lógica de aprobación */
        },
        permissions: ["approve"],
      },
      {
        label: "Rechazar",
        action: (row) => {
          /* Lógica de rechazo */
        },
        permissions: ["reject"],
      },
    ],
  });
  const columns = useMemo(
    () => getColumnsGeneric<Role>({ actions: listActions, colDef }),
    [colDef]
  );
  /*   const columnsWithActions: ColumnDef<Role>[] = useMemo(() => {
    return [
      ...columns,
      {
        header: "Acciones",
        accessorKey: "acciones",
        enableHiding: false,
        cell: ({ row }) => (
          <DataActions itemSelected={row.original} actions={crudActions} />
        ),
        size: 50,
      },
    ];
  }, [columns]); */
  return (
    <div className="container mx-auto p-4">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">CRUD</h1>
      </div>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Button onClick={() => handleOpenModal({ mode: "add" })}>Add</Button>
        </div>
        <AllViewItems<Role, undefined>
          columns={columns}
          listActions={listActions}
          dataApi={dataApi}
        />
      </div>
      <WindowsModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={title}
      >
        {modalMode === "view" ? (
          currentItem && (
            <CardViewContent<Role>
              key={currentItem.id}
              data={currentItem}
              defCardViewKey={colDef}
            />
          )
        ) : (
          <p>El formuario</p>
        )}
      </WindowsModal>
    </div>
  );
};

export default Roles;
