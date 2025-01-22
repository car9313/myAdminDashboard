import { requestsSchema } from "../schemas/requestsSchema";
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
import { dataApi } from "../data/dataApi";
import Loader from "@/components/loader";
import useCrudForm from "@/hooks/useCrudForm";
import { ModalMode } from "@/interfaces/modalMode";
import { Solicitud } from "../models/requests";
import SelectField from "@/components/form/SelectField";
import DatePickerField from "@/components/form/DatePickerField";
import { statusOptions } from "../data/filters";

interface CrudFormProps {
  modalMode: ModalMode;
  currentRequest?: Solicitud | undefined;
  onAfterSubmit: () => void;
}

const CrudForm = ({
  modalMode,
  currentRequest,
  onAfterSubmit,
}: CrudFormProps) => {
  const { form, onSubmit, isSubmitting } = useCrudForm({
    schema: requestsSchema,
    defaultValues: { cantidad: 0, status_solicitud: "", fecha: "" },
    currentItem: currentRequest,
    modalMode,
    onAfterSubmit,
    dataApi,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-2">
        <FormField
          name="cantidad"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cantidad</FormLabel>
              <FormControl>
                <Input placeholder="Cantidad" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <SelectField
          name="status_solicitud"
          label="Estados"
          options={statusOptions}
          control={form.control}
        />
        <DatePickerField name="fecha" label="Fecha" control={form.control} />
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
