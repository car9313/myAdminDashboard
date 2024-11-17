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
import { format, subDays } from "date-fns";
import {
  useController,
  FieldValues,
  UseControllerProps,
} from "react-hook-form";
import { startOfMonth, endOfMonth } from "date-fns";
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
  // Opciones de fecha relativa
  const relativeDateOptions = [
    { label: "Hoy", range: { from: new Date(), to: new Date() } },
    {
      label: "Últimos 7 días",
      range: { from: subDays(new Date(), 7), to: new Date() },
    },
    {
      label: "Este mes",
      range: { from: startOfMonth(new Date()), to: endOfMonth(new Date()) },
    },
    {
      label: "Últimos 30 días",
      range: { from: subDays(new Date(), 30), to: new Date() },
    },
  ];

  // Manejador de selección de fecha relativa
  const handleRelativeDateSelect = (range: DateRange) => {
    field.onChange(range);
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
            {relativeDateOptions.map((option) => (
              <Button
                key={option.label}
                variant="outline"
                onClick={() => handleRelativeDateSelect(option.range)}
              >
                {option.label}
              </Button>
            ))}
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
