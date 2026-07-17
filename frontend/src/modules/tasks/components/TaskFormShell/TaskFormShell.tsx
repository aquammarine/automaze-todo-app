import {
  Alert,
  AlertDescription,
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@/shared/components/ui";
import { XIcon } from "lucide-react";

interface TaskFormShellProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
  submitLabel: string;
  isSubmitting: boolean;
  error?: string;
  children: React.ReactNode;
}

function TaskFormShell({
  open,
  onOpenChange,
  title,
  onSubmit,
  onCancel,
  submitLabel,
  isSubmitting,
  error,
  children,
}: TaskFormShellProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      onSubmit(e as unknown as React.FormEvent);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-xl gap-0 p-0 flex flex-col max-h-[calc(100svh-2rem)]"
        showCloseButton={false}
        onKeyDown={handleKeyDown}
      >
        <form onSubmit={onSubmit} className="flex flex-col min-h-0 flex-1">
          <div className="flex shrink-0 items-center justify-between px-6 pt-5">
            <DialogTitle className="text-base font-semibold">
              {title}
            </DialogTitle>
            <DialogClose
              render={<Button variant="ghost" size="icon-sm" type="button" />}
            >
              <XIcon className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </DialogClose>
          </div>

          <div className="flex-1 overflow-y-auto">
            {children}

            {error && (
              <Alert variant="destructive" className="mx-6 mt-2">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </div>

          <div className="shrink-0 flex flex-col-reverse gap-2 p-4 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="w-full sm:w-auto"
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button type="submit" size="sm" className="w-full sm:w-auto" disabled={isSubmitting}>
              {submitLabel}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export { TaskFormShell };
