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
import { itemSPASchema } from "../schemas/ItemSPAFormSchema";
import { ItemSPA } from "../models/itemSPA";
import { dataApi } from "../data/dataApi";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Loader from "@/components/loader";
import useCrudForm from "@/hooks/useCrudForm";

interface CrudFormProps {
  modalMode: string;
  currentItem?: ItemSPA;
}

const CrudForm = ({ modalMode, currentItem }: CrudFormProps) => {
  const navigate = useNavigate();

  const onAfterSubmit = () => {
    navigate("/itemsSPA");
  };
  const { form, onSubmit, isSubmitting } = useCrudForm({
    schema: itemSPASchema,
    defaultValues: { name: "", description: "" },
    currentItem,
    modalMode,
    onAfterSubmit,
    dataApi,
  });
  return (
    <Card className="rounded-md">
      <CardHeader></CardHeader>
      <CardContent>
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
                className="mb-1 sm:mb-0"
                variant={"destructive"}
                type={"button"}
                onClick={onAfterSubmit}
              >
                Cancelar
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
export default CrudForm;
