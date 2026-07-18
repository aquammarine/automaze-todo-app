interface Task {
  id: string;
  title: string;
  description: string | null;
  priority: number;
  completed: boolean;
  dueDate: string | null;
  createdAt: string;
  updatedAt: string;
}

interface TaskFilterParams {
  title?: string;
  completion?: "all" | "done" | "undone";
  priorityOrder?: "asc" | "desc";
  dueDateOrder?: "asc" | "desc";
}

export type { Task, TaskFilterParams };
