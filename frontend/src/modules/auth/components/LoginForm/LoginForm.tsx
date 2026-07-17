import { Controller } from "react-hook-form";
import { Link } from "@tanstack/react-router";
import { Alert, AlertDescription, Button, Field, FieldError, FieldGroup, FieldLabel, PasswordInput } from "@/shared/components/ui";
import { Input } from "@/shared/components/ui/input";
import { useLoginForm } from "../../hooks/useLoginForm";
import { useLoginMutation } from "../../hooks/useLoginMutation";

function LoginForm() {
  const form = useLoginForm();
  const mutation = useLoginMutation(form.setError);

  const onSubmit = form.handleSubmit((data) => mutation.mutateAsync(data));

  const { control, formState: { errors, isSubmitting } } = form;

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
      </FieldGroup>

      {errors.root && (
        <Alert variant="destructive">
          <AlertDescription>{errors.root.message}</AlertDescription>
        </Alert>
      )}

      <Button type="submit" size="lg" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Signing in..." : "Sign in"}
      </Button>

      <p className="text-center text-sm">
        Don't have an account?{" "}
        <Link to="/register" className="text-primary font-semibold hover:underline">
          Sign up
        </Link>
      </p>
    </form>
  );
}

export { LoginForm };
