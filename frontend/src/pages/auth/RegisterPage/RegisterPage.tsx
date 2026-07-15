import {
  Card,
  CardContent,
} from "@/shared/components/ui";
import { RegisterForm } from "@/modules/auth/components/RegisterForm";

function RegisterPage() {
  return (
    <div className="w-full max-w-md">
      <Card className="ring-0 shadow-xl shadow-slate-200/80 dark:shadow-slate-950/80">
        <div className="px-8 pt-4">
          <h1 className="text-2xl font-bold">Create an account</h1>
          <p>Enter your details below to get started</p>
        </div>

        <CardContent className="px-8 py-6">
          <RegisterForm />
        </CardContent>
      </Card>
    </div>
  );
}

export { RegisterPage };
