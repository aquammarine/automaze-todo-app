import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateTask } from "../api";

export const useToggleTaskMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, completed }: { id: string; completed: boolean }) =>
      updateTask(id, { completed }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: () => {
      toast.error("Failed to update task. Please try again.");
    },
  });
};
