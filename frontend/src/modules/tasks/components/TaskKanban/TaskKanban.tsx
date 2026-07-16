import type { Task, TaskFilterParams } from "../../types";
import { TaskCard } from "../TaskCard";

interface TaskKanbanProps {
  tasks: Task[];
  completion?: TaskFilterParams["completion"];
}

const ALL_COLUMNS = [
  {
    key: "todo",
    label: "To-do",
    color: "bg-muted-foreground",
    filter: (t: Task) => !t.completed,
  },
  {
    key: "done",
    label: "Done",
    color: "bg-emerald-500",
    filter: (t: Task) => t.completed,
  },
] as const;

function TaskKanban({ tasks, completion }: TaskKanbanProps) {
  const columns =
    completion === "undone"
      ? [ALL_COLUMNS[0]]
      : completion === "done"
        ? [ALL_COLUMNS[1]]
        : ALL_COLUMNS;

  return (
    <div
      className={`grid gap-4 ${columns.length === 1 ? "grid-cols-1" : "sm:grid-cols-2"}`}
    >
      {columns.map((col) => {
        const columnTasks = tasks.filter(col.filter);
        return (
          <div key={col.key} className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <div className={`h-2 w-2 rounded-full ${col.color}`} />
              <span className="text-sm font-medium">{col.label}</span>
              <span className="text-muted-foreground text-xs">
                {columnTasks.length}
              </span>
            </div>

            <div className="flex flex-col gap-2">
              {columnTasks.length === 0 ? (
                <p className="text-muted-foreground rounded-lg border border-dashed px-4 py-6 text-center text-xs">
                  No tasks
                </p>
              ) : (
                columnTasks.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export { TaskKanban };
