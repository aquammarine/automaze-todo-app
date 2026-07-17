import { TaskFormShell } from "../TaskFormShell";
import { TaskFormFields } from "../TaskFormFields";
import { useEditTaskForm } from "../../hooks/useEditTaskForm";
import { useUpdateTaskMutation } from "../../hooks/useUpdateTaskMutation";
import type { Task } from "../../types";

interface EditTaskModalProps {
  task: Task;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function EditTaskModal({ task, open, onOpenChange }: EditTaskModalProps) {
  const form = useEditTaskForm(task);
  const mutation = useUpdateTaskMutation(task.id, form.setError, () =>
    onOpenChange(false),
  );

  const onSubmit = form.handleSubmit((data) => mutation.mutateAsync(data));

  const {
    control,
    formState: { errors, isSubmitting },
    reset,
  } = form;

  const handleCancel = () => {
    reset();
    onOpenChange(false);
  };

  return (
    <TaskFormShell
      open={open}
      onOpenChange={onOpenChange}
      title="Edit Task"
      onSubmit={onSubmit}
      onCancel={handleCancel}
      submitLabel={isSubmitting ? "Saving..." : "Save changes"}
      isSubmitting={isSubmitting}
      error={errors.root?.message}
    >
      <TaskFormFields control={control} />
    </TaskFormShell>
  );
}

export { EditTaskModal };
