import { Popover } from "@base-ui/react/popover";
import { format, parseISO } from "date-fns";
import { CalendarIcon, XIcon } from "lucide-react";
import { Button } from "./button";
import { Calendar } from "./calendar";
import { cn } from "@/shared/lib/utils";

interface DatePickerProps {
  value?: string | null;
  onChange: (value: string | null) => void;
  placeholder?: string;
}

function DatePicker({
  value,
  onChange,
  placeholder = "No due date",
}: DatePickerProps) {
  const selected = value ? parseISO(value) : undefined;

  function handleSelect(date: Date | undefined) {
    onChange(date ? date.toISOString() : null);
  }

  return (
    <div className="flex w-full gap-1">
      <Popover.Root>
        <Popover.Trigger
          render={
            <Button
              type="button"
              variant="outline"
              size="sm"
              className={cn(
                "flex-1 justify-start gap-2 font-normal",
                !selected && "text-muted-foreground",
              )}
            />
          }
        >
          <CalendarIcon className="size-4 shrink-0" />
          <span>{selected ? format(selected, "PPP") : placeholder}</span>
        </Popover.Trigger>

        <Popover.Portal>
          <Popover.Positioner sideOffset={8} align="start" className="z-100">
            <Popover.Popup className="rounded-lg bg-popover shadow-md outline-none">
              <Calendar
                mode="single"
                selected={selected}
                onSelect={handleSelect}
                disabled={{ before: new Date() }}
                autoFocus
              />
            </Popover.Popup>
          </Popover.Positioner>
        </Popover.Portal>
      </Popover.Root>

      {selected && (
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          onClick={() => onChange(null)}
        >
          <XIcon className="size-3.5" />
        </Button>
      )}
    </div>
  );
}

export { DatePicker };
