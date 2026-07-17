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
        className="sm:max-w-xl gap-0 p-0"
        showCloseButton={false}
        onKeyDown={handleKeyDown}
      >
        <form onSubmit={onSubmit} className="flex flex-col">
          <div className="flex items-center justify-between px-6 pt-5">
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

          {children}

          {error && (
            <Alert variant="destructive" className="mx-6 mt-2">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="flex justify-end gap-2 p-4">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button type="submit" size="sm" disabled={isSubmitting}>
              {submitLabel}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export { TaskFormShell };
