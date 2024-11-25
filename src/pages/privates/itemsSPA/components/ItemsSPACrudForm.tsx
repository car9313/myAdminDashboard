import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import useCrudQueryActions from "@/hooks/useCrudQueryActions";
import { itemSPASchema, ItemSPASchemaType } from "../schemas/ItemSPAFormSchema";
import { ItemSPA } from "../models/itemSPA";
import { dataApi } from "./../data/dataApi";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

interface CrudFormProps {
  modalMode: string;
  currentItem?: ItemSPA;
  /*  onCloseModal: () => void; */
}

const ItemsSPACrudForm = ({
  modalMode,
  currentItem,
  /*   onCloseModal, */
}: CrudFormProps) => {
  const navigate = useNavigate();
  console.log(currentItem);
  const form = useForm<ItemSPASchemaType>({
    resolver: zodResolver(itemSPASchema),
    defaultValues: {
      name: "",
      description: "",
    } /* currentItem ? currentItem : {} */,
    mode: "onChange",
  });
  const { mutationCreate, mutationUpdate } =
    useCrudQueryActions<ItemSPASchemaType>({
      ...dataApi,
    });

  // Rellenar los valores iniciales si están disponibles
  useEffect(() => {
    if (currentItem) {
      form.setValue("name", currentItem.name);
      form.setValue("description", currentItem.description);
    }
  }, [currentItem, form.setValue]);

  const handleUpdate = (id: string, formData: ItemSPASchemaType) => {
    console.log(mutationUpdate.isPending);
    mutationUpdate.mutate(
      {
        id,
        updatedItem: formData,
      },
      {
        onSuccess: () => {
          navigate("/itemsSPA");
        },
      }
    );
    console.log(mutationUpdate.isPending);
  };
  const handleCreate = (formData: ItemSPASchemaType) => {
    mutationCreate.mutate(formData, {
      onSuccess: () => {
        navigate("/itemsSPA");
      },
    });
  };
  const onSubmit = (formData: ItemSPASchemaType) => {
    if (modalMode === "edit" && currentItem) {
      handleUpdate(currentItem.id, formData);
    } else if (modalMode === "add") {
      handleCreate(formData);
    }
  };
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="Description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogFooter>
            <Button className="mb-1 sm:mb-0" disabled={!form.formState.isValid}>
              Guardar
            </Button>
            <Button
              className="mb-1 sm:mb-0"
              variant={"destructive"}
              type={"button"}
              /*  onClick={onCloseModal} */
            >
              Cancelar
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </>
  );
};
export default ItemsSPACrudForm;
