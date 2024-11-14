import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useController, FieldValues, UseControllerProps } from "react-hook-form";

interface Option {
  label: string;
  value: string;
}

interface MultiSelectCheckboxFieldProps<T extends FieldValues> extends UseControllerProps<T> {
  label: string;
  options: Option[];
}

const MultiSelectCheckboxField = <T extends FieldValues>({
  label,
  options,
  ...controllerProps
}: MultiSelectCheckboxFieldProps<T>) => {
  const { field } = useController(controllerProps);

  const handleCheckboxChange = (value: string) => {
    const newValue = field.value.includes(value)
      ? field.value.filter((item: string) => item !== value)
      : [...field.value, value];
    field.onChange(newValue);
  };

  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <div className="flex flex-wrap gap-2">
          {options.map((option) => (
            <label key={option.value} className="flex items-center space-x-2">
              <Checkbox
                checked={field.value.includes(option.value)}
                onCheckedChange={() => handleCheckboxChange(option.value)}
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};

export default MultiSelectCheckboxField;
