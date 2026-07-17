import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getTasks } from "../api";
import type { TaskFilterParams } from "../types";

export const useTasksQuery = (filters?: TaskFilterParams) => {
  return useQuery({
    queryKey: ["tasks", filters],
    queryFn: () => getTasks(filters),
    placeholderData: keepPreviousData,
  });
};
