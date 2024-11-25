import { useEffect, useState } from "react";
import {
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";
import { FormControl, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Popover } from "@radix-ui/react-popover";
import { PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../custom/button";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";

interface Option {
  label: string;
  value: string;
}
interface DependentSelectFieldProps<T extends FieldValues>
  extends UseControllerProps<T> {
  label: string;
  options: Option[];
  dependentOptions: Record<string, Option[]>;
  multiple?: boolean;
}

const DependentSelectField = <T extends FieldValues>({
  label,
  options,
  dependentOptions,
  multiple = false,
  ...controllerProps
}: DependentSelectFieldProps<T>) => {
  const { field } = useController(controllerProps);
  const [filteredOptions, setFilteredOptions] = useState<Option[]>([]);
  console.log(options);
  console.log(dependentOptions);
  // Lógica para filtrar las opciones del segundo select dependiendo del valor seleccionado en el primero
  useEffect(() => {
    console.log(field.value);
    if (field.value) {
      console.log("Aqui");
      setFilteredOptions(dependentOptions[field.value] || []);
    } else {
      setFilteredOptions([]);
    }
  }, [field.value, dependentOptions]);

  const handleSelect = (value: string) => {
    if (multiple) {
      const currentValues: string[] = Array.isArray(field.value)
        ? field.value
        : [];
      if (currentValues.includes(value)) {
        field.onChange(currentValues.filter((v) => v !== value));
      } else {
        field.onChange([...currentValues, value]);
      }
    } else {
      field.onChange(value);
    }
  };

  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <Popover>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant="outline"
              role="combobox"
              className={cn(
                "w-full justify-between",
                !field.value && "text-muted-foreground"
              )}
            >
              {multiple
                ? Array.isArray(field.value) && field.value.length > 0
                  ? field.value
                      .map(
                        (val: any) =>
                          filteredOptions.find((opt) => opt.value === val)
                            ?.label
                      )
                      .join(", ")
                  : "Seleccionar opciones"
                : field.value
                  ? filteredOptions.find(
                      (option) => option.value === field.value
                    )?.label
                  : "Seleccionar opción"}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0">
          <Command>
            <CommandInput placeholder="Buscar..." />
            <CommandList>
              <CommandEmpty>No se encontraron resultados.</CommandEmpty>
              <CommandGroup>
                {filteredOptions.map((option) => {
                  console.log(filteredOptions);
                  return (
                    <CommandItem
                      key={option.value}
                      onSelect={() => handleSelect(option.value)}
                      className="cursor-pointer"
                    >
                      {option.label}
                      {multiple && (
                        <Check
                          className={cn(
                            "ml-auto h-4 w-4",
                            Array.isArray(field.value) &&
                              field.value.includes(option.value)
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                      )}
                      {!multiple && option.value === field.value && (
                        <Check className="ml-auto h-4 w-4 opacity-100" />
                      )}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <FormMessage />
    </FormItem>
  );
};
export default DependentSelectField;
