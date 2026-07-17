import * as React from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import axios from "axios";
import { useAuthStore } from "@/shared/stores/auth.store";
import { Toaster } from "@/shared/components/ui/sonner";

export const Route = createRootRoute({
  beforeLoad: async () => {
    const { token, setAuth, user } = useAuthStore.getState();
    if (!token) {
      try {
        const { data } = await axios.post(
          `${import.meta.env.VITE_API_URL}/auth/refresh`,
          {},
          { withCredentials: true },
        );
        setAuth(data.accessToken, user);
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
