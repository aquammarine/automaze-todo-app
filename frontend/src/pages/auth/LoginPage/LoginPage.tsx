import {
  Card,
  CardContent,
} from "@/shared/components/ui";
import { LoginForm } from "@/modules/auth/components/LoginForm";

function LoginPage() {
  return (
    <div className="w-full max-w-md">
      <Card className="ring-0 shadow-xl shadow-slate-200/80 dark:shadow-slate-950/80">
        <div className="items-center pb-2 px-8 pt-4">
          <h1 className="text-2xl font-bold">Welcome back</h1>
          <p>Sign in to your account to continue</p>
        </div>

        <CardContent className="px-8 py-6">
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
}

export { LoginPage };
