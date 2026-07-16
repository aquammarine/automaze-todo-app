import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import type { UseFormSetError } from "react-hook-form";
import { useAuthStore } from "@/shared/stores/auth.store";
import { login } from "../api/auth.api";
import type { LoginSchema } from "../schemas/auth.schemas";

export const useLoginMutation = (setError: UseFormSetError<LoginSchema>) => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: LoginSchema) => login(data.email, data.password),
    onSuccess: ({ accessToken, user }) => {
      useAuthStore.getState().setAuth(accessToken, user);
      navigate({ to: "/" });
    },
    onError: (error: Error) => {
      setError("root", { message: error.message ?? "Something went wrong. Please try again." });
    },
  });
};
