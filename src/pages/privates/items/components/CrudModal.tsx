import WindowsModal from "@/components/modal/WindowsModal";
import { Item } from "../models/item";
import CardViewContent from "@/components/CardView/CardViewContent";
import { colDef } from "../data/colDef";
import CrudForm from "./CrudForm";
import { ModalMode } from "@/interfaces/modalMode";

interface CrudModalProps {
  isModalOpen: boolean;
  modalMode: ModalMode;
  currentItem: Item | null;
  handleCloseModal: () => void;
  title: string;
}

const CrudModal = ({
  isModalOpen,
  modalMode,
  currentItem,
  handleCloseModal,
  title,
}: CrudModalProps) => {
  return (
    <WindowsModal isOpen={isModalOpen} onClose={handleCloseModal} title={title}>
      {modalMode === "view" ? (
        currentItem && (
          <CardViewContent<Item>
            key={currentItem.id}
            data={currentItem}
            defCardViewKey={colDef}
          />
        )
      ) : (
        <CrudForm
          modalMode={modalMode}
          currentItem={currentItem}
          onAfterSubmit={handleCloseModal}
        />
      )}
    </WindowsModal>
  );
};

export default CrudModal;
