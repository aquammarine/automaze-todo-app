import { ArrowRight } from "lucide-react";
import { Button } from "@/shared/components/ui";
import { useAuthStore } from "@/shared/stores/auth.store";
import { TaskBoard } from "../TaskBoard";

function DashboardView() {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="flex flex-col gap-10">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold tracking-tight">
            Welcome back{user ? `, ${user.email.split("@")[0]}` : ""}
          </h1>
          <p className="text-muted-foreground">
            Here's what's on your board today.
          </p>
        </div>
        <Button>
          New task <ArrowRight className="size-4" />
        </Button>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="font-semibold">Your board</h2>
        <TaskBoard />
      </div>
    </div>
  );
}

export { DashboardView };
