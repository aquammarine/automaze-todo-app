import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useAuthStore } from "@/shared/stores/auth.store";
import { logout } from "../api/auth.api";

export const useLogoutMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: logout,
    onSettled: () => {
      useAuthStore.getState().clearAuth();
      navigate({ to: "/login" });
    },
  });
};
