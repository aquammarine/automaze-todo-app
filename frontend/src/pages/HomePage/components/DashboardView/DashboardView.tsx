import { Link } from "@tanstack/react-router";
import { ArrowRightIcon, ListTodoIcon } from "lucide-react";
import { Button } from "@/shared/components/ui";
import { useAuthStore } from "@/shared/stores/auth.store";

function DashboardView() {
  const user = useAuthStore((state) => state.user);
  const name = user?.email.split("@")[0];

  return (
    <div className="flex flex-col items-center gap-6 py-24 text-center">
      <div className="bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-medium">
        Welcome back, {name}
      </div>
      <h1 className="max-w-xl text-4xl font-bold tracking-tight">
        Ready to get things done?
      </h1>
      <p className="text-muted-foreground max-w-sm text-base">
        Pick up where you left off. Your tasks are waiting.
      </p>
      <Button size="lg">
        <Link to="/tasks" className="flex items-center gap-2">
          <ListTodoIcon className="size-4" />
          Go to Tasks
          <ArrowRightIcon className="size-4" />
        </Link>
      </Button>
    </div>
  );
}

export { DashboardView };
