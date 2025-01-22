import { ModalMode } from "@/interfaces/modalMode";
import CrudForm from "./CrudForm";
import { Item } from "../models/item";
import Modal from "@/components/modal/Modal";
import CardViewContent from "@/components/CardView/CardViewContent";
import { viewDef } from "../data/viewDef";
import ConfirmContent from "../../../../components/Crud/ConfirmContent";
import { CRUD_MESSAGES } from "@/data/constants/messages";
import { dataApi } from "../data/dataApi";
import useDeleteAction from "@/hooks/crud/modal/useDeleteAction";

interface DynamicModalProps {
  mode: ModalMode;
  isOpen: boolean;
  onClose: () => void;
  item?: Item;
}

const DynamicModal = ({ mode, isOpen, onClose, item }: DynamicModalProps) => {
  const getTitle = (): string => {
    switch (mode) {
      case "add":
        return "Insertar Nuevo Item";
      case "edit":
        return `Editar Item: ${item?.name || "N/A"}`;
      case "delete":
        return `Eliminar Item: ${item?.name || "N/A"}`;
      case "read":
        return `Detalles del Item: ${item?.name || "N/A"}`;
      default:
        return "Modal";
    }
  };

  const renderContent = () => {
    switch (mode) {
      case "read":
        return (
          <CardViewContent<Item>
            key={item?.id}
            data={item}
            defCardViewKey={viewDef}
          />
        );

      case "add":
      case "edit":
        return (
          <CrudForm
            modalMode={mode}
            currentItem={item}
            onAfterSubmit={onClose}
          />
        );
      case "delete": {
        const { handleDelete } = useDeleteAction({
          dataApi,
          currentItem: item,
          onAfterSubmit: onClose,
        });
        return (
          <ConfirmContent
            onClose={onClose}
            onConfirm={handleDelete}
            description={CRUD_MESSAGES.confirmDeletionDescription}
          />
        );
      }
      default:
        return null;
    }
  };

  return (
    <Modal title={getTitle()} isOpen={isOpen} onClose={onClose}>
      {renderContent()}
    </Modal>
  );
};

export default DynamicModal;
