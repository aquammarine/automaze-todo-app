import { api } from "@/shared/lib/axios";
import type { Task, TaskFilterParams } from "../types";
import type { CreateTaskSchema } from "../schemas";

export const getTasks = async (filters?: TaskFilterParams): Promise<Task[]> => {
  const response = await api.get("/tasks", { params: filters });
  return response.data;
};

export const createTask = async (data: CreateTaskSchema): Promise<Task> => {
  const response = await api.post("/tasks", data);
  return response.data;
};
