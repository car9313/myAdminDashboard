import { Button } from "@/components/ui/button";
import { FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { FieldValues, useController, UseControllerProps } from "react-hook-form";

interface LanguageOption {
  label: string;
  value: string;
}

interface LanguageSelectFieldProps<T extends FieldValues> extends UseControllerProps<T> {
  label: string;
  options: LanguageOption[];
}

const LanguageSelectField = <T extends FieldValues>({
  label,
  options,
  ...controllerProps
}: LanguageSelectFieldProps<T>) => {
  const { field } = useController(controllerProps);

  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <Popover>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant="outline"
              role="combobox"
              className={cn("w-full justify-between", !field.value && "text-muted-foreground")}
            >
              {field.value
                ? options.find((option) => option.value === field.value)?.label
                : "Select language"}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search language..." />
            <CommandList>
              <CommandEmpty>No language found.</CommandEmpty>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option.value}
                    onSelect={() => field.onChange(option.value)}
                    className="cursor-pointer"
                  >
                    {option.label}
                    <Check
                      className={cn("ml-auto h-4 w-4", option.value === field.value ? "opacity-100" : "opacity-0")}
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

export default LanguageSelectField;
