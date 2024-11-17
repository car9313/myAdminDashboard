// BooleanSwitchField.tsx
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

interface BooleanSwitchFieldProps<T extends FieldValues>
  extends UseControllerProps<T> {
  label: string;
}

const BooleanSwitchField = <T extends FieldValues>({
  label,
  ...controllerProps
}: BooleanSwitchFieldProps<T>) => {
  const { field } = useController(controllerProps);

  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <label className="flex items-center">
          <input
            type="checkbox"
            className="switch-class-name" // Replace with your switch class
            checked={field.value || false}
            onChange={(e) => field.onChange(e.target.checked)}
          />
          <span className="ml-2">{label}</span>
        </label>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};

export default BooleanSwitchField;
