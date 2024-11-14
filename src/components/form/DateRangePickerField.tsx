import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import {
  useController,
  FieldValues,
  UseControllerProps,
} from "react-hook-form";
import {
  startOfToday,
  endOfToday,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
} from "date-fns";
import { cn } from "@/lib/utils";
interface DateRange {
  from: Date | null;
  to: Date | null;
}

interface DateRangePickerFieldProps<T extends FieldValues>
  extends UseControllerProps<T> {
  label: string;
}

const DateRangePickerField = <T extends FieldValues>({
  label,
  ...controllerProps
}: DateRangePickerFieldProps<T>) => {
  const { field } = useController(controllerProps);

  const setToday = () => {
    field.onChange("rangeDate", { from: startOfToday(), to: endOfToday() });
  };

  const setThisWeek = () => {
    field.onChange("rangeDate", {
      from: startOfWeek(new Date()),
      to: endOfWeek(new Date()),
    });
  };

  const setThisMonth = () => {
    field.onChange("rangeDate", {
      from: startOfMonth(new Date()),
      to: endOfMonth(new Date()),
    });
  };

  const formatDateRange = (range: DateRange) => {
    if (range.from && range.to) {
      return `${format(range.from, "LLL dd, y")} - ${format(range.to, "LLL dd, y")}`;
    }
    if (range.from) {
      return `${format(range.from, "LLL dd, y")}`;
    }
    return "Pick a date range";
  };

  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <Popover>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant="outline"
              className={cn(
                "w-full text-left font-normal",
                !field.value && "text-muted-foreground"
              )}
            >
              {field.value ? (
                formatDateRange(field.value)
              ) : (
                <span>Pick a date range</span>
              )}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <div className="flex flex-col md:flex-row justify-center items-center gap-1 p-2">
            <Button variant="outline" onClick={setToday}>
              Hoy
            </Button>
            <Button variant="outline" onClick={setThisWeek}>
              Esta semana
            </Button>
            <Button variant="outline" onClick={setThisMonth}>
              Este mes
            </Button>
          </div>
          <Calendar
            mode="range"
            selected={field.value}
            onSelect={field.onChange}
            numberOfMonths={2}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <FormMessage />
    </FormItem>
  );
};

export default DateRangePickerField;
