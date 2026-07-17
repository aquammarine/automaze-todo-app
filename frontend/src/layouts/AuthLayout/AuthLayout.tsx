import type { ReactNode } from "react";

function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      {children}
    </div>
  );
}

export { AuthLayout };
