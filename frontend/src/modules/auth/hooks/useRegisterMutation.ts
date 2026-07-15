import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import type { UseFormSetError } from "react-hook-form";
import { useAuthStore } from "@/shared/stores/auth.store";
import { register } from "../api/auth.api";
import type { RegisterSchema } from "../schemas/auth.schemas";

export const useRegisterMutation = (setError: UseFormSetError<RegisterSchema>) => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: RegisterSchema) => register(data.email, data.password),
    onSuccess: ({ accessToken, user }) => {
      useAuthStore.getState().setAuth(accessToken, user);
      navigate({ to: "/" });
    },
    onError: (error: Error) => {
      setError("root", { message: error.message ?? "Something went wrong. Please try again." });
    },
  });
};
