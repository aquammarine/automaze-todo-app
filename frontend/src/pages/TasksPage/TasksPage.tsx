import { useState } from "react";
import { useTasksQuery } from "@/modules/tasks/hooks";
import { CreateTaskModal } from "@/modules/tasks/components/CreateTaskModal";
import { TaskFilters, TaskFiltersSkeleton } from "@/modules/tasks/components/TaskFilters";
import { TaskKanban, TaskKanbanSkeleton } from "@/modules/tasks/components/TaskKanban";
import type { TaskFilterParams } from "@/modules/tasks/types";
import { Button } from "@/shared/components/ui";
import { Plus } from "lucide-react";

function TasksPage() {
  const [modalOpen, setModalOpen] = useState(false);
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
          <Button size="sm" onClick={() => setModalOpen(true)}>
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
          />
        )}
      </div>

      <CreateTaskModal open={modalOpen} onOpenChange={setModalOpen} />
    </>
  );
}

export { TasksPage };
