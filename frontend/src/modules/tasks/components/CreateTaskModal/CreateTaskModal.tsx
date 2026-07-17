import { TaskFormShell } from "../TaskFormShell";
import { TaskFormFields } from "../TaskFormFields";
import { useCreateTaskForm } from "../../hooks/useCreateTaskForm";
import { useCreateTaskMutation } from "../../hooks/useCreateTaskMutation";

interface CreateTaskModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function CreateTaskModal({ open, onOpenChange }: CreateTaskModalProps) {
  const form = useCreateTaskForm();
  const mutation = useCreateTaskMutation(form.setError, () => {
    form.reset();
    onOpenChange(false);
  });

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
      title="New Task"
      onSubmit={onSubmit}
      onCancel={handleCancel}
      submitLabel={isSubmitting ? "Creating..." : "Create task"}
      isSubmitting={isSubmitting}
      error={errors.root?.message}
    >
      <TaskFormFields control={control} />
    </TaskFormShell>
  );
}

export { CreateTaskModal };
