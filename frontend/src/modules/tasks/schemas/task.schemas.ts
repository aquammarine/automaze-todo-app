import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  priority: z
    .number({ error: "Priority is required" })
    .int()
    .min(1, "Min priority is 1")
    .max(10, "Max priority is 10"),
  dueDate: z.string().datetime({ offset: true }).optional(),
});

export type CreateTaskSchema = z.infer<typeof createTaskSchema>;

export const updateTaskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  priority: z.number().int().min(1).max(10),
  completed: z.boolean().optional(),
  dueDate: z.string().datetime({ offset: true }).optional().nullable(),
});

export type UpdateTaskSchema = z.infer<typeof updateTaskSchema>;
