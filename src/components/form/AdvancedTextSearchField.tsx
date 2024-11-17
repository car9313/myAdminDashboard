// AdvancedTextSearchField.tsx
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
import { Input } from "../ui/input";

interface AdvancedTextSearchFieldProps<T extends FieldValues>
  extends UseControllerProps<T> {
  label: string;
  placeholder?: string;
}

const AdvancedTextSearchField = <T extends FieldValues>({
  label,
  placeholder,
  ...controllerProps
}: AdvancedTextSearchFieldProps<T>) => {
  const { field } = useController(controllerProps);

  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <Input
          type="text"
          placeholder={placeholder || "Search..."}
          value={field.value || ""}
          onChange={(e) => field.onChange(e.target.value)}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};

export default AdvancedTextSearchField;
