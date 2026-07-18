import { useEffect, useRef, useState } from "react";
import { useDebounce } from "@/shared/hooks/useDebounce";
import type { TaskFilterParams } from "../types";

export function useTaskSearch(
  filters: TaskFilterParams,
  onChange: (filters: TaskFilterParams) => void,
) {
  const [search, setSearch] = useState(filters.title ?? "");
  const debouncedSearch = useDebounce(search, 400);
  const filtersRef = useRef(filters);
  filtersRef.current = filters;

  useEffect(() => {
    onChange({ ...filtersRef.current, title: debouncedSearch || undefined });
  }, [debouncedSearch]);

  return { search, setSearch };
}
