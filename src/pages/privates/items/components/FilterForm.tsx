import { Button } from "@/components/custom/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Form, 
} from "@/components/ui/form";


import { IconFilter, IconFilterCancel } from "@tabler/icons-react";
import { SubmitHandler, useForm } from "react-hook-form";


import TextInputField from "@/components/form/TextInputField";
import LanguageSelectField from "@/components/form/SelectField";
import DatePickerField from "@/components/form/DatePickerField";

import DateRangePickerField from "@/components/form/DateRangePickerField";

const languageOptions = [
  { label: "English", value: "en" },
  { label: "Spanish", value: "es" },
  { label: "French", value: "fr" },
];

interface Filters {
  name: string;
  language: string;
  date: Date | null;
  isActive: boolean;
  description: string;
  rangeDate: { from: Date | null; to: Date | null };
}
interface FilterFormProps {
  onApplyFilters: (filters: Filters) => void;
  onClearFilters: () => void;
  disabledFilter: boolean;
}

const FilterForm = ({
  onApplyFilters,
  onClearFilters,
  disabledFilter,
}: FilterFormProps) => {
  const form = useForm<Filters>({
    defaultValues: {
      name: "",
      language: "",
      date: null,
      isActive: false,
      description: "",
      rangeDate: { from: null, to: null },
    },
  });
  const onSubmit: SubmitHandler<Filters> = (data) => {
    console.log(data);
    onApplyFilters(data);
  };
  const handleClear = () => {
    form.reset(); // Restablece los campos a sus valores por defecto
    onClearFilters(); // Llama a la función para limpiar filtros
  };

  const hasActiveFilters = form.formState.isDirty || form.formState.isSubmitted;
 /*  const normalizeDateValue = (date: Date | null) => date || undefined;
  const normalizeDateRange = (range: {
    from: Date | null;
    to: Date | null;
  }) => {
    return {
      from: range.from || undefined,
      to: range.to || undefined,
    };
  }; */

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button disabled={disabledFilter} variant="outline">
            {hasActiveFilters ? <IconFilterCancel /> : <IconFilter />}
            Filtrar
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="p-4 w-auto md:max-w-2xl overflow-auto max-h-96">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className=" max-w-2xl py-2"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <TextInputField
                  name="name"
                  label="Nombre"
                  placeholder="Filtrar por nombre"
                  control={form.control}
                />
                 <TextInputField
                  name="description"
                  label="Descripcion"
                  placeholder="Filtrar por Descripcion"
                  control={form.control}
                />
                <LanguageSelectField
                  name="language"
                  label="Language"
                  options={languageOptions}
                  control={form.control}
                />
                <DatePickerField
                  name="date"
                  label="Date of birth"
                  control={form.control}
                />
                  <DateRangePickerField name="rangeDate" label="Rango de Fecha" control={form.control} />
              </div>
              {hasActiveFilters && (
                <div className="flex justify-end gap-4">
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
