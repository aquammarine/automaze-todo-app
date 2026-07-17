import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import type { UseFormSetError } from "react-hook-form";
import { useAuthStore } from "@/shared/stores/auth.store";
import { getApiErrorMessage, getApiStatusCode } from "@/shared/lib/errors";
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
    onError: (error: unknown) => {
      if (getApiStatusCode(error) === 409) {
        setError("root", { message: "An account with this email already exists." });
        return;
      }
      setError("root", { message: getApiErrorMessage(error) });
    },
  });
};
