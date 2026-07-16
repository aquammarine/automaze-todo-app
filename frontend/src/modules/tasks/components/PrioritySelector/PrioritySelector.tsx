import { Button } from "@/shared/components/ui";

interface PrioritySelectorProps {
  value: number;
  onChange: (value: number) => void;
}

const PRIORITIES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const;

function PrioritySelector({ value, onChange }: PrioritySelectorProps) {
  return (
    <div className="flex gap-1">
      {PRIORITIES.map((p) => (
        <Button
          key={p}
          type="button"
          size="sm"
          variant={value === p ? "default" : "outline"}
          className="w-8 px-0"
          onClick={() => onChange(p)}
        >
          {p}
        </Button>
      ))}
    </div>
  );
}

export { PrioritySelector };
