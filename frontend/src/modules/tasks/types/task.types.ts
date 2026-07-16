interface Task {
  id: string;
  title: string;
  description: string | null;
  priority: number;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

interface TaskFilterParams {
  title?: string;
  completion?: "ALL" | "DONE" | "UNDONE";
  priorityOrder?: "ASC" | "DESC";
}

export type { Task, TaskFilterParams };
