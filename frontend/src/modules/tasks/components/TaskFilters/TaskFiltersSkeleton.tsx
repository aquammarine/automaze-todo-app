import { Skeleton } from "@/shared/components/ui";

function TaskFiltersSkeleton() {
  return (
    <div className="flex items-end justify-between gap-4">
      <div className="flex flex-col gap-1.5">
        <Skeleton className="h-3 w-10" />
        <Skeleton className="h-8 w-48" />
      </div>

      <div className="flex items-end gap-2">
        <div className="flex flex-col gap-1.5">
          <Skeleton className="h-3 w-12" />
          <Skeleton className="h-8 w-48" />
        </div>

        <div className="flex flex-col gap-1.5">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-8 w-36" />
        </div>
      </div>
    </div>
  );
}

export { TaskFiltersSkeleton };
