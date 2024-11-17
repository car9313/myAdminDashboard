// RelationFilterField.tsx
import {
  useController,
  FieldValues,
  UseControllerProps,
} from "react-hook-form";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/custom/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";

interface RelatedOption {
  label: string;
  value: string;
}

interface RelationFilterFieldProps<T extends FieldValues>
  extends UseControllerProps<T> {
  label: string;
  options: RelatedOption[];
  multiple?: boolean; // Para manejar selección múltiple si es necesario
}

const RelationFilterField = <T extends FieldValues>({
  label,
  options,
  multiple = false,
  ...controllerProps
}: RelationFilterFieldProps<T>) => {
  const { field } = useController(controllerProps);

  // Manejador para actualizar el valor del campo
  const handleSelect = (value: string) => {
    if (multiple) {
      // Manejar selección múltiple
      const currentValues: string[] = Array.isArray(field.value)
        ? field.value
        : [];
      if (currentValues.includes(value)) {
        field.onChange(currentValues.filter((v) => v !== value));
      } else {
        field.onChange([...currentValues, value]);
      }
    } else {
      // Manejar selección única
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
                          options.find((opt) => opt.value === val)?.label
                      )
                      .join(", ")
                  : "Seleccionar opciones"
                : field.value
                  ? options.find((option) => option.value === field.value)
                      ?.label
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
                {options.map((option) => (
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
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <FormMessage />
    </FormItem>
  );
};

export default RelationFilterField;
