import { Controller } from "react-hook-form";
import { Link } from "@tanstack/react-router";
import {
  Button,
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  PasswordInput,
} from "@/shared/components/ui";
import { Input } from "@/shared/components/ui/input";
import { useRegisterForm } from "../../hooks/useRegisterForm";
import { useRegisterMutation } from "../../hooks/useRegisterMutation";

function RegisterForm() {
  const form = useRegisterForm();
  const mutation = useRegisterMutation(form.setError);

  const onSubmit = form.handleSubmit((data) => mutation.mutateAsync(data));

  const {
    control,
    formState: { errors, isSubmitting },
  } = form;

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6">
      <FieldGroup>
        <Controller
          name="email"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="johndoe@example.com"
                className="h-10"
                aria-invalid={fieldState.invalid}
                {...field}
              />
              <FieldError errors={[fieldState.error]} />
            </Field>
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <PasswordInput
                id="password"
                placeholder="Enter your password"
                className="h-10"
                aria-invalid={fieldState.invalid}
                {...field}
              />
              <FieldError errors={[fieldState.error]} />
            </Field>
          )}
        />

        <Controller
          name="confirmPassword"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="confirmPassword">
                Confirm password
              </FieldLabel>
              <PasswordInput
                id="confirmPassword"
                placeholder="Repeat your password"
                className="h-10"
                aria-invalid={fieldState.invalid}
                {...field}
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

      <Button
        type="submit"
        size="lg"
        disabled={isSubmitting}
        className="w-full"
      >
        {isSubmitting ? "Creating account..." : "Create account"}
      </Button>

      <p className="text-center text-sm">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-primary font-semibold hover:underline"
        >
          Sign in
        </Link>
      </p>
    </form>
  );
}

export { RegisterForm };
