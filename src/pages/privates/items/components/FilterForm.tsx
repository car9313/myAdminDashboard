import { Button } from "@/components/custom/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  IconFilter,
  IconFilterCancel,
  IconFilterExclamation,
  IconFilterFilled,
  IconFilterSearch,
} from "@tabler/icons-react";
import { SubmitHandler, useForm } from "react-hook-form";

interface Filters {
  name?: string;
  description?: string;
  
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
      description: "",
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
  // Verificar si hay filtros activos
  const hasActiveFilters = form.formState.isDirty || form.formState.isSubmitted;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button disabled={disabledFilter} variant="outline">
            {hasActiveFilters ? <IconFilterFilled /> : <IconFilter />}
            Filtros
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="p-4 w-full max-h-80 overflow-y-auto scrollOverflow max-w-sm md:max-w-md lg:max-w-xl ">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombre</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Filtrar por nombre"
                            type="text"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Descripción</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Filtrar por descripción"
                            type="text"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Descripción</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Filtrar por descripción"
                            type="text"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Descripción</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Filtrar por descripción"
                            type="text"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Descripción</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Filtrar por descripción"
                            type="text"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              {hasActiveFilters && (
                <div className="flex justify-end gap-2">
                  <Button type="submit">
                    <IconFilterSearch /> Aplicar
                  </Button>
                  <Button type="button" variant={'ghost'} onClick={handleClear}>
                    <IconFilterCancel />
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
{
  /* <DropdownMenuContent className="p-4 w-auto md:max-w-2xl">
<Form {...form}>
  <form
    onSubmit={form.handleSubmit(onSubmit)}
    className=" max-w-2xl py-2"
  >
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-3">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input
                  placeholder="Filtrar por nombre"
                  type="text"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="col-span-3">
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción</FormLabel>
              <FormControl>
                <Input
                  placeholder="Filtrar por descripción"
                  type="text"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="col-span-3">
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción</FormLabel>
              <FormControl>
                <Input
                  placeholder="Filtrar por descripción"
                  type="text"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="col-span-3">
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción</FormLabel>
              <FormControl>
                <Input
                  placeholder="Filtrar por descripción"
                  type="text"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="col-span-3">
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción</FormLabel>
              <FormControl>
                <Input
                  placeholder="Filtrar por descripción"
                  type="text"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
    {hasActiveFilters && (
      <div className="flex justify-end gap-4">
        <Button type="submit" className=""><IconFilterSearch/> Aplicar</Button>
        <Button type="button" onClick={handleClear}>
        <IconFilterCancel/>
          Limpiar
        </Button>
      </div>
    )}
  </form>
</Form>
</DropdownMenuContent> */
}
