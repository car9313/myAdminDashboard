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

import DateRangePickerField from "@/components/form/DateRangePickerField";
import MultiSelectField from "@/components/form/SelectMultipleField";
import NumberRangeField from "@/components/form/NumberRangeFiel";
import CategoryCheckboxField from "@/components/form/CategoryCheckboxField";
import BooleanSwitchField from "@/components/form/BooleanSwitchField";
import AdvancedTextSearchField from "@/components/form/AdvancedTextSearchField";
import TagInputField from "@/components/form/TagInputField";
import SelectField from "@/components/form/SelectField";
import { Filters } from "../models/filters";
const languageOptions = [
  { label: "English", value: "en" },
  { label: "Spanish", value: "es" },
  { label: "French", value: "fr" },
  { label: "Italic", value: "it" },
  { label: "Arabic", value: "ar" },
  { label: "Russian", value: "ru" },
];

// Opciones de ejemplo
const categoryOptions = [
  { label: "Categoría 1", value: "cat1" },
  { label: "Categoría 2", value: "cat2" },
  { label: "Categoría 3", value: "cat3" },
];

interface FilterFormProps {
  onApplyFilters: (filters: Filters) => void;
  onClearFilters: () => void;
}

const FilterForm = ({ onApplyFilters, onClearFilters }: FilterFormProps) => {
  const form = useForm<Filters>({
    defaultValues: {
      name: "",
      language: "",
      languages: [],
      date: null,
      isActive: false,
      description: "",
      rangeDate: { from: null, to: null },
      categories: [], // Valores por defecto
      isPublished: false, // Valor por defecto
      advancedSearch: "", // Valor por defecto
      keywords: [], // Valor por defecto
      relatedItems: [],
      category: "",
      product: "",
    },
  });
  const onSubmit: SubmitHandler<Filters> = (data) => {
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
                <SelectField
                  name="language"
                  label="Language"
                  options={languageOptions}
                  control={form.control}
                />
                <MultiSelectField // Usa el nuevo MultiSelectField
                  name="languages"
                  label="Languages"
                  options={languageOptions}
                  control={form.control}
                />
                <DatePickerField
                  name="date"
                  label="Date of birth"
                  control={form.control}
                />
                <DateRangePickerField
                  name="rangeDate"
                  label="Rango de Fecha"
                  control={form.control}
                />
                <NumberRangeField
                  name="priceRange"
                  label="Rango de precio"
                  control={form.control}
                />
                <CategoryCheckboxField
                  name="categories"
                  label="Categorías"
                  options={categoryOptions}
                  control={form.control}
                />
                <BooleanSwitchField
                  name="isPublished"
                  label="Publicado"
                  control={form.control}
                />
                <AdvancedTextSearchField
                  name="advancedSearch"
                  label="Búsqueda avanzada"
                  placeholder="Buscar texto avanzado"
                  control={form.control}
                />
                <TagInputField
                  name="keywords"
                  label="Palabras clave"
                  placeholder="Añadir palabras clave"
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
    /*  <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Abrir filtros</Button>
      </SheetTrigger>
      <SheetContent side="top">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className=" w-full p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
              <SelectField
                name="language"
                label="Language"
                options={languageOptions}
                control={form.control}
              />
              <MultiSelectField // Usa el nuevo MultiSelectField
                name="languages"
                label="Languages"
                options={languageOptions}
                control={form.control}
              />
              <DatePickerField
                name="date"
                label="Date of birth"
                control={form.control}
              />
              <DateRangePickerField
                name="rangeDate"
                label="Rango de Fecha"
                control={form.control}
              />
              <NumberRangeField
                name="priceRange"
                label="Rango de precio"
                control={form.control}
              />
              <CategoryCheckboxField
                name="categories"
                label="Categorías"
                options={categoryOptions}
                control={form.control}
              />
              <BooleanSwitchField
                name="isPublished"
                label="Publicado"
                control={form.control}
              />
              <AdvancedTextSearchField
                name="advancedSearch"
                label="Búsqueda avanzada"
                placeholder="Buscar texto avanzado"
                control={form.control}
              />
              <TagInputField
                name="keywords"
                label="Palabras clave"
                placeholder="Añadir palabras clave"
                control={form.control}
              />
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
      </SheetContent>
    </Sheet> */
  );
};
export default FilterForm;
