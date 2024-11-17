import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";

interface LanguageOption {
  label: string;
  value: string;
}

interface MultiSelectFieldProps<T extends FieldValues>
  extends UseControllerProps<T> {
  label: string;
  options: LanguageOption[];
}

const MultiSelectField = <T extends FieldValues>({
  label,
  options,
  ...controllerProps
}: MultiSelectFieldProps<T>) => {
  const { field } = useController(controllerProps);

  // Ensure field.value is an array to handle multiple selections
  const selectedValues: string[] = Array.isArray(field.value)
    ? field.value
    : [];

  const toggleOption = (value: string) => {
    if (selectedValues.includes(value)) {
      field.onChange(selectedValues.filter((item) => item !== value));
    } else {
      field.onChange([...selectedValues, value]);
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
                !selectedValues.length && "text-muted-foreground"
              )}
            >
              {selectedValues.length
                ? options
                    .filter((option) => selectedValues.includes(option.value))
                    .map((option) => option.label)
                    .join(", ")
                : "Select languages"}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search languages..." />
            <CommandList>
              <CommandEmpty>No language found.</CommandEmpty>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option.value}
                    onSelect={() => toggleOption(option.value)}
                    className="cursor-pointer"
                  >
                    {option.label}
                    <Check
                      className={cn(
                        "ml-auto h-4 w-4",
                        selectedValues.includes(option.value)
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
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

export default MultiSelectField;
