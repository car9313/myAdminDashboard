import { ModalMode } from "@/interfaces/modalMode";
import CrudForm from "./CrudForm";
import Modal from "@/components/modal/Modal";
import CardViewContent from "@/components/CardView/CardViewContent";
import { viewDef } from "../data/viewDef";
import ConfirmContent from "../../../../components/Crud/ConfirmContent";
import { CRUD_MESSAGES } from "@/data/constants/messages";
import { dataApi } from "../data/dataApi";
import useDeleteAction from "@/hooks/crud/modal/useDeleteAction";
import { Solicitud } from "../models/requests";

interface DynamicModalProps {
  mode: ModalMode;
  isOpen: boolean;
  onClose: () => void;
  item?: Solicitud;
}

const DynamicModal = ({ mode, isOpen, onClose, item }: DynamicModalProps) => {
  const getTitle = (): string => {
    switch (mode) {
      case "add":
        return "Insertar Nuevo Item";
      case "edit":
        return `Editar Solicitud: ${item?.id || "N/A"}`;
      case "delete":
        return `Eliminar Solicitud: ${item?.id || "N/A"}`;
      case "read":
        return `Detalles del Item: ${item?.id || "N/A"}`;
      default:
        return "Modal";
    }
  };

  const renderContent = () => {
    switch (mode) {
      case "read":
        return (
          <CardViewContent<Solicitud>
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
            currentRequest={item}
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
