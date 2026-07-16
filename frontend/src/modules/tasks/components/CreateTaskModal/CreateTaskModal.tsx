import { Controller } from "react-hook-form";
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/shared/components/ui";
import { Input } from "@/shared/components/ui/input";
import { PrioritySelector } from "../PrioritySelector";
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
  } = form;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create task</DialogTitle>
        </DialogHeader>

        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <FieldGroup>
            <Controller
              name="title"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="title">Title</FieldLabel>
                  <Input
                    id="title"
                    placeholder="Task title"
                    className="h-10"
                    aria-invalid={fieldState.invalid}
                    {...field}
                  />
                  <FieldError errors={[fieldState.error]} />
                </Field>
              )}
            />

            <Controller
              name="description"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="description">
                    Description{" "}
                    <span className="text-muted-foreground font-normal">
                      (optional)
                    </span>
                  </FieldLabel>
                  <Input
                    id="description"
                    placeholder="Task description"
                    className="h-10"
                    aria-invalid={fieldState.invalid}
                    {...field}
                  />
                  <FieldError errors={[fieldState.error]} />
                </Field>
              )}
            />

            <Controller
              name="priority"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Priority</FieldLabel>
                  <PrioritySelector
                    value={field.value}
                    onChange={field.onChange}
                  />
                  <FieldError errors={[fieldState.error]} />
                </Field>
              )}
            />
          </FieldGroup>

          {errors.root && (
            <div className="bg-destructive/10 border-destructive/20 rounded-lg border px-4 py-3">
              <span className="text-destructive text-sm">
                {errors.root.message}
              </span>
            </div>
          )}
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create task"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export { CreateTaskModal };
