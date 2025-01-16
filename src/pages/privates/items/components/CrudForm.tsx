import { itemSchema } from "../schemas/itemSchema";
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
import { Item } from "../models/item";
import { dataApi } from "../data/dataApi";
import Loader from "@/components/loader";
import useCrudForm from "@/hooks/useCrudForm";
import { ModalMode } from "@/interfaces/modalMode";

interface CrudFormProps {
  modalMode: ModalMode;
  currentItem?: Item | undefined;
  onAfterSubmit: () => void;
}

const CrudForm = ({ modalMode, currentItem, onAfterSubmit }: CrudFormProps) => {
  const { form, onSubmit, isSubmitting } = useCrudForm({
    schema: itemSchema,
    defaultValues: { name: "", description: "" },
    currentItem,
    modalMode,
    onAfterSubmit,
    dataApi,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-2">
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
          <Button
            disabled={
              !form.formState.isValid ||
              !Object.keys(form.formState.dirtyFields).length
            }
          >
            {isSubmitting && <Loader />}
            Guardar
          </Button>
          <Button
            variant={"destructive"}
            type={"button"}
            onClick={onAfterSubmit}
          >
            Cancelar
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};
export default CrudForm;
