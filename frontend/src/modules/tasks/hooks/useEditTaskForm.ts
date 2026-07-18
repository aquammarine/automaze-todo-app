import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateTaskSchema, type UpdateTaskSchema } from "../schemas";
import type { Task } from "../types";

export const useEditTaskForm = (task: Task) => {
  return useForm<UpdateTaskSchema>({
    resolver: zodResolver(updateTaskSchema),
    defaultValues: {
      title: task.title,
      description: task.description ?? "",
      priority: task.priority,
      dueDate: task.dueDate ?? undefined,
    },
  });
};
