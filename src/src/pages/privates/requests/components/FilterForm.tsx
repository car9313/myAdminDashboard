import { Button } from "@/components/custom/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Form } from "@/components/ui/form";

import { IconFilter, IconFilterCancel } from "@tabler/icons-react";
import { SubmitHandler, useForm } from "react-hook-form";

import TextInputField from "@/components/form/TextInputField";
import DatePickerField from "@/components/form/DatePickerField";

import SelectField from "@/components/form/SelectField";
import { RequestFormSchema } from "./../schemas/requestsSchema";
import { statusOptions } from "../data/filters";

interface FilterFormProps {
  onApplyFilters: (filters: RequestFormSchema) => void;
  onClearFilters: () => void;
}

const FilterForm = ({ onApplyFilters, onClearFilters }: FilterFormProps) => {
  const form = useForm<RequestFormSchema>({
    defaultValues: {
      cantidad: 0,
      status_solicitud: "",
      fecha: "",
    },
  });
  const onSubmit: SubmitHandler<RequestFormSchema> = (data) => {
    onApplyFilters(data);
  };
  const handleClear = () => {
    form.reset(); // Restablece los campos a sus valores por defecto
    onClearFilters(); // Llama a la función para limpiar filtros
  };

  const hasActiveFilters = form.formState.isDirty || form.formState.isSubmitted;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            {hasActiveFilters ? <IconFilterCancel /> : <IconFilter />}
            Filtrar
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="p-2 mx-4 w-auto max-w-[80vw]  overflow-auto max-h-96">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className=" w-full p-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <TextInputField
                  name="cantidad"
                  label="Cantidad"
                  placeholder="Filtrar por cantidad"
                  control={form.control}
                />
                <SelectField
                  name="status_solicitud"
                  label="Estados"
                  options={statusOptions}
                  control={form.control}
                />
                <DatePickerField
                  name="fecha"
                  label="Fecha"
                  control={form.control}
                />
              </div>
              {hasActiveFilters && (
                <div className="flex justify-end gap-4 ">
                  <Button type="submit">Aplicar filtros</Button>
                  <Button type="button" onClick={handleClear}>
                    Limpiar
                  </Button>
                </div>
              )}
            </form>
          </Form>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
export default FilterForm;
