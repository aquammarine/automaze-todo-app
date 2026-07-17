import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UseFormSetError } from "react-hook-form";
import { createTask } from "../api";
import type { CreateTaskSchema } from "../schemas";

export const useCreateTaskMutation = (
  setError: UseFormSetError<CreateTaskSchema>,
  onSuccess: () => void,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateTaskSchema) => createTask(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      onSuccess();
    },
    onError: (error: Error) => {
      setError("root", {
        message: error.message ?? "Something went wrong. Please try again.",
      });
    },
  });
};
