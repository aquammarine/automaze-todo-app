import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UseFormSetError } from "react-hook-form";
import { updateTask } from "../api";
import type { UpdateTaskSchema } from "../schemas";

export const useUpdateTaskMutation = (
  id: string,
  setError: UseFormSetError<UpdateTaskSchema>,
  onSuccess: () => void,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateTaskSchema) => updateTask(id, data),
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
