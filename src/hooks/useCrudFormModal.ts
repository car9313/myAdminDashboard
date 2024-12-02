import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ZodType, ZodTypeDef, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useCrudQueryActions from "./useCrudQueryActions";

type ModalMode = "add" | "edit";
type UseAppFormProps<TSchema extends ZodType<any, ZodTypeDef, any>, TItem> = {
  schema: TSchema; // Esquema Zod para validación
  defaultValues: z.infer<TSchema>; // Valores iniciales por defecto
  currentItem?: TItem | null | undefined; // Elemento actual (en modo edición)
  modalMode: string; // Modo del modal ("add" o "edit")
  onCloseModal: () => void; // Función para cerrar el modal
  dataApi: {
    key: string;
    endPoint: string;
  };
};

const useCrudFormModal = <
  TSchema extends ZodType<any, ZodTypeDef, any>,
  TItem extends { id: string },
>({
  schema,
  defaultValues,
  currentItem,
  modalMode,
  /* mutationCreate,
mutationUpdate, */
  onCloseModal,
  dataApi,
}: UseAppFormProps<TSchema, TItem>) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<TSchema>>({
    resolver: zodResolver(schema),
    defaultValues,
  });
  // Rellenar los valores iniciales si `currentItem` está disponible
  useEffect(() => {
    if (currentItem) {
      form.reset({ ...currentItem });
    }
  }, [currentItem, form.reset]);
  const { mutationCreate, mutationUpdate } = useCrudQueryActions<
    z.infer<TSchema>
  >({
    ...dataApi,
  });
  const handleUpdate = (formData: z.infer<TSchema>, id: string) => {
    mutationUpdate.mutate(
      { id, updatedItem: formData },
      {
        onSettled: () => {
          setIsSubmitting(false);
          onCloseModal();
        },
      }
    );
  };
  const handleCreate = (formData: z.infer<TSchema>) => {
    mutationCreate.mutate(formData, {
      onSettled: () => {
        setIsSubmitting(false);
        onCloseModal();
      },
    });
  };
  const onSubmit = (formData: z.infer<TSchema>) => {
    setIsSubmitting(true);
    if (modalMode === "edit" && currentItem) {
      handleUpdate(formData, currentItem.id);
    } else if (modalMode === "add") {
      handleCreate(formData);
    }
  };
  return {
    form,
    onSubmit,
    isSubmitting,
  };
};

export default useCrudFormModal;
