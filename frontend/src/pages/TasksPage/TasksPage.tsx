import { useState } from "react";
import { useTasksQuery } from "@/modules/tasks/hooks";
import { CreateTaskModal } from "@/modules/tasks/components/CreateTaskModal";
import { EditTaskModal } from "@/modules/tasks/components/EditTaskModal";
import { TaskFilters } from "@/modules/tasks/components/TaskFilters";
import { TaskKanban, TaskKanbanSkeleton } from "@/modules/tasks/components/TaskKanban";
import type { Task, TaskFilterParams } from "@/modules/tasks/types";
import { Button } from "@/shared/components/ui";
import { Plus } from "lucide-react";

function TasksPage() {
  const [createOpen, setCreateOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [filters, setFilters] = useState<TaskFilterParams>({});
  const { data: tasks, isFetching, isError } = useTasksQuery(filters);

  if (isError) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-destructive text-sm">Failed to load tasks.</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Tasks</h1>
          <Button size="sm" onClick={() => setCreateOpen(true)}>
            <Plus className="size-4" />
            Create task
          </Button>
        </div>

        <TaskFilters filters={filters} onChange={setFilters} />

        {isFetching ? (
          <TaskKanbanSkeleton completion={filters.completion} />
        ) : (
          <TaskKanban
            tasks={tasks ?? []}
            completion={filters.completion}
            onTaskClick={setEditingTask}
          />
        )}
      </div>

      <CreateTaskModal open={createOpen} onOpenChange={setCreateOpen} />

      {editingTask && (
        <EditTaskModal
          task={editingTask}
          open={!!editingTask}
          onOpenChange={(open) => !open && setEditingTask(null)}
        />
      )}
    </>
  );
}

export { TasksPage };
