import { Slider } from "@/components/ui/slider";
import { FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useController, FieldValues, UseControllerProps } from "react-hook-form";

interface RangeSliderFieldProps<T extends FieldValues> extends UseControllerProps<T> {
  label: string;
  min: number;
  max: number;
  step?: number;
}

const RangeSliderField = <T extends FieldValues>({
  label,
  min,
  max,
  step = 1,
  ...controllerProps
}: RangeSliderFieldProps<T>) => {
  const { field } = useController(controllerProps);

  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <Slider
          value={field.value || [min, max]}
          onChange={field.onChange}
          min={min}
          max={max}
          step={step}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};

export default RangeSliderField;
