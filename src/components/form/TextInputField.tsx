import { FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FieldValues, useController, UseControllerProps } from "react-hook-form";

interface TextInputFieldProps<T extends FieldValues> extends UseControllerProps<T> {
  label: string;
  placeholder?: string;
}

const TextInputField = <T extends FieldValues>({
  label,
  placeholder,
  ...controllerProps
}: TextInputFieldProps<T>) => {
  const { field, fieldState } = useController(controllerProps);

  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <Input placeholder={placeholder} {...field} />
      </FormControl>
      <FormMessage>{fieldState.error?.message}</FormMessage>
    </FormItem>
  );
};

export default TextInputField;
