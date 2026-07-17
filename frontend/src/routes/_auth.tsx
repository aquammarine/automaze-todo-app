import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { AuthLayout } from "@/layouts";
import { useAuthStore } from "@/shared/stores/auth.store";

export const Route = createFileRoute("/_auth")({
  beforeLoad: () => {
    const token = useAuthStore.getState().token;
    if (token) throw redirect({ to: "/" });
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <AuthLayout>
      <Outlet />
    </AuthLayout>
  );
}
