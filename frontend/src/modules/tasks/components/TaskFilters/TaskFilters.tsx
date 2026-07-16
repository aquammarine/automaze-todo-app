import { useEffect, useRef, useState } from "react";
import { useDebounce } from "@/shared/hooks/useDebounce";
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

interface TaskFiltersProps {
  filters: TaskFilterParams;
  onChange: (filters: TaskFilterParams) => void;
}

type TabValue = "all" | "undone" | "done";

function TaskFilters({ filters, onChange }: TaskFiltersProps) {
  const [search, setSearch] = useState(filters.title ?? "");
  const debouncedSearch = useDebounce(search, 400);
  const filtersRef = useRef(filters);
  filtersRef.current = filters;

  useEffect(() => {
    onChange({ ...filtersRef.current, title: debouncedSearch || undefined });
  }, [debouncedSearch]);

  const activeTab: TabValue =
    filters.completion === "undone"
      ? "undone"
      : filters.completion === "done"
        ? "done"
        : "all";

  const handleTabChange = (value: string) => {
    onChange({
      ...filters,
      completion: value === "all" ? undefined : (value as "undone" | "done"),
    });
  };

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex flex-col gap-1.5">
        <span className="text-muted-foreground text-xs font-medium">Status</span>
        <Tabs value={activeTab} onValueChange={handleTabChange}>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="undone">To-do</TabsTrigger>
            <TabsTrigger value="done">Done</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="flex items-end gap-2">
        <div className="flex flex-col gap-1.5">
          <span className="text-muted-foreground text-xs font-medium">Search</span>
          <Input
            placeholder="Search tasks..."
            className="h-8 w-48"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <span className="text-muted-foreground text-xs font-medium">Sort by priority</span>
          <Select
          value={filters.priorityOrder ?? null}
          onValueChange={(value) => {
            const v = value as string;
            onChange({
              ...filters,
              priorityOrder: v === "none" ? undefined : (v as "asc" | "desc"),
            });
          }}
        >
          <SelectTrigger className="w-36">
            <SelectValue placeholder="Priority">
              {filters.priorityOrder === "asc"
                ? "Lowest priority"
                : filters.priorityOrder === "desc"
                  ? "Highest priority"
                  : "Priority"}
            </SelectValue>
          </SelectTrigger>
          <SelectContent alignItemWithTrigger={false}>
            <SelectItem value="none">Default</SelectItem>
            <SelectItem value="asc">Lowest priority</SelectItem>
            <SelectItem value="desc">Highest priority</SelectItem>
          </SelectContent>
        </Select>
        </div>
      </div>
    </div>
  );
}

export { TaskFilters };
