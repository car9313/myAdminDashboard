import { useState } from "react";
import { ModalKeys, ModalMode } from "@/interfaces/modalMode";

interface ModalState<T> {
  isOpen: boolean;
  mode: ModalMode;
  data?: T;
}

const useManagerModal = <T>() => {
  const [modalsState, setModalsState] = useState<
    Record<ModalKeys, ModalState<T>>
  >({} as Record<ModalKeys, ModalState<T>>);
  const getModalState = (modalKey: ModalKeys) => {
    return modalsState[modalKey]; /* || { isOpen: false, modalKey }; */
  };

  const setModalState = (modalKey: ModalKeys, state: ModalState<T>): void => {
    setModalsState((prev) => ({
      ...prev,
      [modalKey]: state,
    }));
  };

  const openModal = (modalKey: ModalKeys, mode: ModalMode, data?: T) => {
    setModalState(modalKey, { isOpen: true, mode, data });
  };

  const closeModal = (modalKey: ModalKeys) => {
    setModalState(modalKey, { isOpen: false, mode: "close", data: undefined });
  };

  const isOpenModal = (modalKey: ModalKeys) => modalsState[modalKey].isOpen;
  return {
    modalsState,
    getModalState,
    openModal,
    closeModal,
    isOpenModal,
  };
};

export default useManagerModal;
