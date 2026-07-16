import { useTasksQuery } from "@/modules/tasks/hooks";
import { Button } from "@/shared/components/ui";
import { Plus } from "lucide-react";
import { TaskTable } from "@/modules/tasks/components/TaskTable";

function TasksPage() {
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
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Tasks</h1>
        <Button size="sm">
          <Plus className="size-4" />
          Create task
        </Button>
      </div>

      <TaskTable tasks={tasks ?? []} />
    </div>
  );
}

export { TasksPage };
