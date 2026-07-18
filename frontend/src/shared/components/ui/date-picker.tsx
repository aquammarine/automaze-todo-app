import { Popover } from "@base-ui/react/popover";
import { format, parseISO } from "date-fns";
import { CalendarIcon, XIcon } from "lucide-react";
import { Button } from "./button";
import { Calendar } from "./calendar";
import { cn } from "@/shared/lib/utils";

interface DatePickerProps {
  value?: string | null;
  onChange: (value: string | undefined) => void;
  placeholder?: string;
}

function DatePicker({
  value,
  onChange,
  placeholder = "No due date",
}: DatePickerProps) {
  const selected = value ? parseISO(value) : undefined;

  function handleSelect(date: Date | undefined) {
    onChange(date ? date.toISOString() : undefined);
  }

  function handleClear(e: React.MouseEvent) {
    e.stopPropagation();
    onChange(undefined);
  }

  return (
    <Popover.Root>
      <Popover.Trigger
        render={
          <Button
            type="button"
            variant="outline"
            size="sm"
            className={cn(
              "w-full justify-start gap-2 font-normal",
              !selected && "text-muted-foreground",
            )}
          />
        }
      >
        <CalendarIcon className="size-4 shrink-0" />
        <span className="flex-1 text-left">
          {selected ? format(selected, "PPP") : placeholder}
        </span>
        {selected && (
          <span
            role="button"
            onClick={handleClear}
            className="ml-auto rounded p-0.5 hover:bg-muted"
          >
            <XIcon className="size-3.5" />
          </span>
        )}
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
  );
}

export { DatePicker };
