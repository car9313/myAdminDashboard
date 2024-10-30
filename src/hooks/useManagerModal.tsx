import { useState } from "react";
interface UseManagerModalReturn<T> {
  isOpenModal: boolean;
  itemSelected: T | null;
  actionModal: string | null;
  handleChangeOpenModal: (value: boolean) => void;
  handleChangeItemSelected: (item: T) => void;
  handleChangeActionModal: (action: string | null) => void;
  openModalWithItemSelectedAndAction: (item: T, action: string | null) => void;
}
const useManagerModal = <T extends object>(): UseManagerModalReturn<T> => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [itemSelected, setItemSelected] = useState<T | null>(null);
  const [actionModal, setActionModal] = useState<string | null>(null);

  const handleChangeOpenModal = (value: boolean) => {
    setIsOpenModal(value);
    if (!value) {
      setItemSelected(null);
    }
  };
  const handleChangeItemSelected = (item: T) => {
    setItemSelected(item);
  };
  const handleChangeActionModal = (action: string | null) => {
    setActionModal(action);
  };
  const openModalWithItemSelectedAndAction = (
    itemSelected: T,
    action: string | null
  ) => {
    handleChangeOpenModal(true);
    handleChangeItemSelected(itemSelected);
    setActionModal(action);
  };
  return {
    isOpenModal,
    itemSelected,
    actionModal,
    handleChangeOpenModal,
    handleChangeItemSelected,
    handleChangeActionModal,
    openModalWithItemSelectedAndAction,
  };
};
export default useManagerModal;
