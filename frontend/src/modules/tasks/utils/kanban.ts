import type { Task, TaskFilterParams } from "../types";

export const ALL_COLUMNS = [
  {
    key: "todo",
    label: "To-do",
    color: "bg-muted-foreground",
    filter: (t: Task) => !t.completed,
    completed: false,
  },
  {
    key: "done",
    label: "Done",
    color: "bg-emerald-500",
    filter: (t: Task) => t.completed,
    completed: true,
  },
] as const;

export type KanbanColumn = (typeof ALL_COLUMNS)[number];

export function getVisibleColumns(completion: TaskFilterParams["completion"]) {
  if (completion === "undone") return ALL_COLUMNS.filter((c) => c.key === "todo");
  if (completion === "done") return ALL_COLUMNS.filter((c) => c.key === "done");
  return ALL_COLUMNS;
}
