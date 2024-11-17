// NumberRangeField.tsx
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

interface NumberRangeFieldProps<T extends FieldValues>
  extends UseControllerProps<T> {
  label: string;
  minLabel?: string;
  maxLabel?: string;
  minPlaceholder?: string;
  maxPlaceholder?: string;
}

const NumberRangeField = <T extends FieldValues>({
  label,
  minLabel = "Min",
  maxLabel = "Max",
  minPlaceholder = "Min value",
  maxPlaceholder = "Max value",
  ...controllerProps
}: NumberRangeFieldProps<T>) => {
  const { field } = useController(controllerProps);

  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <div className="flex flex-col gap-2">
          <Input
            type="number"
            placeholder={minPlaceholder}
            className="input-class-name" // Replace with your input class
            value={field.value?.min || ""}
            onChange={(e) =>
              field.onChange({ ...field.value, min: e.target.valueAsNumber })
            }
          />
          <Input
            type="number"
            placeholder={maxPlaceholder}
            className="input-class-name" // Replace with your input class
            value={field.value?.max || ""}
            onChange={(e) =>
              field.onChange({ ...field.value, max: e.target.valueAsNumber })
            }
          />
        </div>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};

export default NumberRangeField;
