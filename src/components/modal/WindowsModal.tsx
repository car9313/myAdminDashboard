import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { ReactNode } from "react";

interface WindowsModalProps {
  isOpen: boolean;
  onClose: (isOpen: boolean) => void;
  title: string;
  children: ReactNode;
}

const WindowsModal = ({
  isOpen,
  onClose,
  title,
  children,
}: WindowsModalProps) => {
  if (!isOpen) return null;
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <div className=" overflow-auto max-h-[70vh] scrollOverflow">
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default WindowsModal;
