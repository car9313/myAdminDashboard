import { useState } from "react";

const useManagerModalDatatable = <T extends object>() => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<T | null>(null);
  const [currentView, setCurrentView] = useState<boolean>(false); // Estado para la vista seleccionada
  const [modalMode, setModalMode] = useState<"add" | "edit" | "view">("add"); // Modo de la modal

  const handleOpenModal = (item?: T, mode: "add" | "edit" | "view" = "add") => {
    setCurrentItem(item || null);
    setIsModalOpen(true);
    setModalMode(mode);
  };

  const handleCloseModal = () => {
    setCurrentItem(null);
    setIsModalOpen(false);
  };
  const handleViewChange = () => {
    setCurrentView(!currentView);
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
    currentView,
    modalMode,
    handleOpenModal,
    handleCloseModal,
    handleViewChange,
    title,
  };
};
export default useManagerModalDatatable;
