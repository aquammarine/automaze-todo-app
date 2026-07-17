import { Skeleton } from "@/shared/components/ui";
import type { TaskFilterParams } from "../../types";

interface TaskKanbanSkeletonProps {
  completion?: TaskFilterParams["completion"];
}

function TaskCardSkeleton() {
  return (
    <div className="rounded-xl ring-1 ring-foreground/10 p-3 flex flex-col gap-3">
      <Skeleton className="h-4 w-3/4" />
      <div className="flex justify-between">
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="h-5 w-6 rounded-full" />
      </div>
    </div>
  );
}

function TaskKanbanSkeleton({ completion }: TaskKanbanSkeletonProps) {
  const columns = completion === "undone" || completion === "done" ? 1 : 2;

  return (
    <div className={`grid gap-4 ${columns === 1 ? "grid-cols-1" : "sm:grid-cols-2"}`}>
      {Array.from({ length: columns }).map((_, col) => (
        <div key={col} className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Skeleton className="h-2 w-2 rounded-full" />
            <Skeleton className="h-3 w-16" />
          </div>
          <div className="flex flex-col gap-2">
            {[0, 1, 2].map((card) => (
              <TaskCardSkeleton key={card} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export { TaskKanbanSkeleton };
