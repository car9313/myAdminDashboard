import { Button } from "@/components/custom/button";

interface ConfirmContentProps {
  onClose: () => void;
  onConfirm: () => void;
  description: string;
}

const ConfirmContent = ({
  onClose,
  onConfirm,
  description,
}: ConfirmContentProps) => {
  return (
    <>
      <div className="flex flex-col space-y-2 text-center sm:text-left">
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
        <Button
          variant={"outline"}
          onClick={onClose}
          className="btn btn-danger"
        >
          Cerrar
        </Button>
        <Button onClick={onConfirm} className="btn btn-danger">
          Confirmar
        </Button>
      </div>
    </>
  );
};

export default ConfirmContent;
