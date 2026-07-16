import { api } from "@/shared/lib/axios";
import type { Task, TaskFilterParams } from "../types";
import type { CreateTaskSchema, UpdateTaskSchema } from "../schemas";

export const getTasks = async (filters?: TaskFilterParams): Promise<Task[]> => {
  const response = await api.get("/tasks", { params: filters });
  return response.data;
};

export const createTask = async (data: CreateTaskSchema): Promise<Task> => {
  const response = await api.post("/tasks", data);
  return response.data;
};

export const updateTask = async (id: string, data: Partial<UpdateTaskSchema>): Promise<Task> => {
  const response = await api.patch(`/tasks/${id}`, data);
  return response.data;
};
