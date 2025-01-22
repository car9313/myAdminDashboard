import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { FieldValues, useController, UseControllerProps } from "react-hook-form";
import { cn } from "@/lib/utils";

interface DatePickerFieldProps<T extends FieldValues> extends UseControllerProps<T> {
  label: string;
}

const DatePickerField = <T extends FieldValues>({ label, ...controllerProps }: DatePickerFieldProps<T>) => {
  const { field } = useController(controllerProps);
 
  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <Popover>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant="outline"
              className={cn("w-full text-left font-normal", !field.value && "text-muted-foreground")}
            >
              {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar mode={"single"} selected={field.value} onSelect={field.onChange} initialFocus />
        </PopoverContent>
      </Popover>
      <FormMessage />
    </FormItem>
  );
};

export default DatePickerField;
