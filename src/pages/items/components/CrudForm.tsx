import { useForm } from "react-hook-form";
import { ItemFormSchema, itemSchema } from "../schemas/itemSchema";
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

interface CrudFormProps {
  onSubmit: (data: ItemFormSchema) => void;
  initialData?: Partial<ItemFormSchema>;
}

const CrudForm = ({ onSubmit, initialData = {} }: CrudFormProps) => {
  const form = useForm<ItemFormSchema>({
    resolver: zodResolver(itemSchema),
    defaultValues: initialData,
    mode: "onChange",
  });
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
            <Button disabled={!form.formState.isValid}>Guardar</Button>
            {/*  <Button
              variant={"destructive"}
              type={"button"}
              onClick={onCloseModal}
            >
              Cancelar
            </Button> */}
          </DialogFooter>
        </form>
      </Form>
    </>
  );
};
export default CrudForm;
