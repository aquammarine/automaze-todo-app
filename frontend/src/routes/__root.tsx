import * as React from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { api } from "@/shared/lib/axios";
import { useAuthStore } from "@/shared/stores/auth.store";
import { Toaster } from "@/shared/components/ui/sonner";

export const Route = createRootRoute({
  beforeLoad: async () => {
    const { token, setAuth } = useAuthStore.getState();
    if (!token) {
      try {
        const { data } = await api.post("/auth/refresh");
        setAuth(data.accessToken, data.user);
      } catch {
        // no valid refresh cookie — stay logged out
      }
    }
  },
  component: RootComponent,
});

function RootComponent() {
  return (
    <React.Fragment>
      <Outlet />
      <Toaster />
    </React.Fragment>
  );
}
