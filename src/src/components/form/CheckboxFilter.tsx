// components/filters/CheckboxFilter.tsx
import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { FieldValues, useController } from "react-hook-form";

interface CheckboxFilterProps<T extends FieldValues> {
  name: keyof T;
  label: string;
  control: any; // Type for the form control from react-hook-form
}

const CheckboxFilter = <T extends FieldValues>({
  name,
  label,
  control,
}: CheckboxFilterProps<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name: name as string,
    control,
  });

  return (
    <FormItem>
      <FormControl>
        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
      </FormControl>
      <FormLabel>{label}</FormLabel>
      {error && <FormMessage>{error.message}</FormMessage>}
    </FormItem>
  );
};

export default CheckboxFilter;
