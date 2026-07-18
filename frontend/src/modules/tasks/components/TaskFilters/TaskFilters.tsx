import {
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/shared/components/ui";
import type { TaskFilterParams } from "../../types";
import { useTaskSearch } from "../../hooks/useTaskSearch";

interface TaskFiltersProps {
  filters: TaskFilterParams;
  onChange: (filters: TaskFilterParams) => void;
}

interface SortSelectProps {
  label: string;
  value?: string | null;
  onChange: (value: string | null) => void;
  options: { value: string; label: string }[];
  placeholder: string;
}

function SortSelect({
  label,
  value,
  onChange,
  options,
  placeholder,
}: SortSelectProps) {
  return (
    <div className="flex flex-col gap-1.5 flex-1 sm:flex-none">
      <span className="text-muted-foreground text-xs font-medium">{label}</span>
      <Select
        value={value ?? null}
        onValueChange={(v) => onChange(v === "none" ? null : v)}
      >
        <SelectTrigger className="w-full sm:w-36">
          <SelectValue placeholder={placeholder}>
            {options.find((o) => o.value === value)?.label ?? placeholder}
          </SelectValue>
        </SelectTrigger>
        <SelectContent alignItemWithTrigger={false}>
          <SelectItem value="none">Default</SelectItem>
          {options.map((o) => (
            <SelectItem key={o.value} value={o.value}>
              {o.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

function TaskFilters({ filters, onChange }: TaskFiltersProps) {
  const { search, setSearch } = useTaskSearch(filters, onChange);

  const activeTab =
    filters.completion === "undone"
      ? "undone"
      : filters.completion === "done"
        ? "done"
        : "all";

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-col gap-1.5">
        <span className="text-muted-foreground text-xs font-medium">
          Status
        </span>
        <Tabs
          value={activeTab}
          onValueChange={(value) =>
            onChange({
              ...filters,
              completion:
                value === "all" ? undefined : (value as "undone" | "done"),
            })
          }
        >
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="undone">To-do</TabsTrigger>
            <TabsTrigger value="done">Done</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="flex flex-wrap items-end gap-2">
        <div className="flex flex-col gap-1.5 flex-1 sm:flex-none">
          <span className="text-muted-foreground text-xs font-medium">
            Search
          </span>
          <Input
            placeholder="Search tasks..."
            className="h-8 w-full sm:w-48"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
          />
        </div>

        <SortSelect
          label="Sort by priority"
          value={filters.priorityOrder}
          onChange={(v) =>
            onChange({
              ...filters,
              priorityOrder: v as "asc" | "desc" | undefined,
            })
          }
          placeholder="Priority"
          options={[
            { value: "asc", label: "Lowest priority" },
            { value: "desc", label: "Highest priority" },
          ]}
        />

        <SortSelect
          label="Sort by due date"
          value={filters.dueDateOrder}
          onChange={(v) =>
            onChange({
              ...filters,
              dueDateOrder: v as "asc" | "desc" | undefined,
            })
          }
          placeholder="Due date"
          options={[
            { value: "asc", label: "Earliest first" },
            { value: "desc", label: "Latest first" },
          ]}
        />
      </div>
    </div>
  );
}

export { TaskFilters };
