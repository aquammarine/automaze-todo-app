import { api } from "@/shared/lib/axios";
import type { Task, TaskFilterParams } from "../types";

export const getTasks = async (filters?: TaskFilterParams): Promise<Task[]> => {
  const response = await api.get("/tasks", { params: filters });
  return response.data;
};
