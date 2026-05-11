import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { IconCalendar } from "@tabler/icons-react";
import { format } from "date-fns";
import { useState } from "react";

interface DatePickerProps {
  value?: number;
  onChange: (value: number) => void;
  placeholder?: string;
}

export function DatePicker({ value, onChange, placeholder }: DatePickerProps) {
  const resolvedPlaceholder = placeholder ?? "Select a date";

  const [open, setOpen] = useState(false);
  const selected = value ? new Date(value) : undefined;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button
            variant="outline"
            type="button"
            className="w-full justify-start font-normal"
          />
        }
      >
        <IconCalendar className="size-3.5 text-muted-foreground" />
        {selected ? (
          <span>{format(selected, "dd MMM yyyy")}</span>
        ) : (
          <span className="text-muted-foreground">{resolvedPlaceholder}</span>
        )}
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={selected}
          onSelect={(date) => {
            if (date) {
              onChange(date.getTime());
              setOpen(false);
            }
          }}
          captionLayout="dropdown"
          defaultMonth={selected}
        />
      </PopoverContent>
    </Popover>
  );
}
