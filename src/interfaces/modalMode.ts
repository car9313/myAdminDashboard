export type ModalMode = "read" | "edit" | "add" | "delete" | "close";

export interface ModalState {
  isOpen: boolean;
  mode: ModalMode;
}

// enums/modalKeys.ts

export enum ModalKeys {
  Modal = "Modal",
  ComfirmModal = "ConfirmModal",
}
