// CategoryCheckboxField.tsx
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  useController,
  FieldValues,
  UseControllerProps,
} from "react-hook-form";

interface CategoryOption {
  label: string;
  value: string;
}

interface CategoryCheckboxFieldProps<T extends FieldValues>
  extends UseControllerProps<T> {
  label: string;
  options: CategoryOption[];
}

const CategoryCheckboxField = <T extends FieldValues>({
  label,
  options,
  ...controllerProps
}: CategoryCheckboxFieldProps<T>) => {
  const { field } = useController(controllerProps);

  const handleCheckboxChange = (value: string) => {
    const currentValues: string[] = field.value || [];
    if (currentValues.includes(value)) {
      field.onChange(currentValues.filter((item: string) => item !== value));
    } else {
      field.onChange([...currentValues, value]);
    }
  };

  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <div className="space-y-2">
          {options.map((option) => (
            <div key={option.value} className="flex items-center">
              <input
                type="checkbox"
                className="checkbox-class-name" // Replace with your checkbox class
                checked={field.value?.includes(option.value)}
                onChange={() => handleCheckboxChange(option.value)}
              />
              <label className="ml-2">{option.label}</label>
            </div>
          ))}
        </div>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};

export default CategoryCheckboxField;
