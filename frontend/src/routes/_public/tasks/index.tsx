import { createFileRoute, redirect } from "@tanstack/react-router";
import { useAuthStore } from "@/shared/stores/auth.store";
import { TasksPage } from "@/pages/TasksPage";

export const Route = createFileRoute("/_public/tasks/")({
  beforeLoad: () => {
    const token = useAuthStore.getState().token;
    if (!token) throw redirect({ to: "/login" });
  },
  component: TasksPage,
});
