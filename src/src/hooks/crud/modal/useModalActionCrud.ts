import { WithId } from "@/interfaces/withId";
import { useCallback } from "react";
import { ActionDef } from "@/interfaces/actionDef";
import { itemActionsList } from "@/data/itemCrudActionsList";
import { ModalKeys, ModalMode } from "@/interfaces/modalMode";
import useManagerModal from "@/hooks/crud/modal/useManagerModal";

interface UseModalActionCrudProps<T> {
  modalManager: ReturnType<typeof useManagerModal<T>>;
}

const useModalActionCrud = <T extends WithId>({
  modalManager,
}: UseModalActionCrudProps<T>) => {
  const handleOpenModal = useCallback(
    ({
      modalKey,
      mode,
      item,
    }: {
      modalKey: ModalKeys;
      mode: ModalMode;
      item?: T;
    }) => {
      modalManager.openModal(modalKey, mode, item);
    },
    [modalManager]
  );

  const handleCloseModal = useCallback(
    ({ modalKey }: { modalKey: ModalKeys }) => {
      modalManager.closeModal(modalKey);
    },
    [modalManager]
  );

  const crudActions: ActionDef<T>[] = [
    {
      id: "read",
      label: "Ver Detalles",
      action: ({ item }) => {
        handleOpenModal({ modalKey: ModalKeys.Modal, mode: "read", item });
      },
      permissions: itemActionsList.read.actions,
    },
    {
      id: "update",
      label: "Editar",
      action: ({ item }) => {
        handleOpenModal({ modalKey: ModalKeys.Modal, mode: "edit", item });
      },
      permissions: itemActionsList.update.actions,
    },
    {
      id: "delete",
      label: "Eliminar",
      action: ({ item }) => {
        handleOpenModal({
          modalKey: ModalKeys.Modal,
          mode: "delete",
          item,
        });
      },
      permissions: itemActionsList.delete.actions,
    },
  ];

  return {
    crudActions,
    handleOpenModal,
    handleCloseModal,
  };
};

export default useModalActionCrud;
