import { ModalMode } from "@/interfaces/modalMode";
import { useState } from "react";

const useManagerModalDatatable = <T>() => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<T | null>(null);

  const [modalMode, setModalMode] = useState<ModalMode>("add"); // Modo de la modal

  const handleOpenModal = ({ mode, item }: { mode: ModalMode; item?: T }) => {
    setCurrentItem(item || null);
    setIsModalOpen(true);
    setModalMode(mode);
  };

  const handleCloseModal = () => {
    setCurrentItem(null);
    setIsModalOpen(false);
  };

  const title =
    modalMode === "view"
      ? "Detalles del Item"
      : modalMode === "edit"
        ? "Editar Item"
        : "Nuevo Item";

  return {
    isModalOpen,
    currentItem,
    modalMode,
    handleOpenModal,
    handleCloseModal,
    title,
  };
};
export default useManagerModalDatatable;
