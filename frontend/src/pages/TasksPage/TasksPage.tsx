import { useState } from "react";
import { useTasksQuery } from "@/modules/tasks/hooks";
import { CreateTaskModal } from "@/modules/tasks/components/CreateTaskModal";
import { TaskTable } from "@/modules/tasks/components/TaskTable";
import { Button } from "@/shared/components/ui";
import { Plus } from "lucide-react";

function TasksPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const { data: tasks, isLoading, isError } = useTasksQuery();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-muted-foreground text-sm">Loading tasks...</p>
      </div>
    );
  }

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

        <TaskTable tasks={tasks ?? []} />
      </div>

      <CreateTaskModal open={modalOpen} onOpenChange={setModalOpen} />
    </>
  );
}

export { TasksPage };
