import { Controller } from "react-hook-form";
import type { Control, FieldValues, Path } from "react-hook-form";
import { DatePicker, FieldError, Input, Separator } from "@/shared/components/ui";
import { cn } from "@/shared/lib/utils";
import { PRIORITY_GROUPS, PRIORITY_COLOR_CLASSES } from "../../utils/priority";

interface TaskFormFieldsProps<
  T extends FieldValues & {
    title: string;
    description?: string;
    priority: number;
    dueDate?: string | null;
  }
> {
  control: Control<T>;
}

function TaskFormFields<
  T extends FieldValues & {
    title: string;
    description?: string;
    priority: number;
    dueDate?: string | null;
  }
>({ control }: TaskFormFieldsProps<T>) {
  return (
    <>
      <div className="flex flex-col gap-4 px-6 py-5">
        <Controller
          name={"title" as Path<T>}
          control={control}
          render={({ field, fieldState }) => (
            <div className="flex flex-col gap-1">
              <Input
                autoFocus
                placeholder="What needs to be done?"
                className="border-none bg-transparent px-0 text-xl font-semibold shadow-none ring-0 focus-visible:ring-0 placeholder:text-muted-foreground/40"
                aria-invalid={fieldState.invalid}
                {...field}
              />
              <FieldError errors={[fieldState.error]} />
            </div>
          )}
        />

        <Controller
          name={"description" as Path<T>}
          control={control}
          render={({ field }) => (
            <textarea
              placeholder="Add details, notes, or context..."
              rows={3}
              className="w-full resize-none bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground/40 leading-relaxed"
              {...field}
            />
          )}
        />
      </div>

      <Separator />

      <div className="px-6 py-3 sm:py-4">
        <div className="flex flex-col gap-2 sm:gap-3">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Priority
          </span>
          <Controller
            name={"priority" as Path<T>}
            control={control}
            render={({ field }) => (
              <div className="flex gap-2 sm:gap-4">
                {PRIORITY_GROUPS.map((group) => {
                  const classes = PRIORITY_COLOR_CLASSES[group.color];
                  const isGroupActive = group.priorities.includes(field.value as number);
                  return (
                    <div key={group.label} className="flex flex-col gap-1">
                      <div className="flex gap-1">
                        {group.priorities.map((p) => (
                          <button
                            key={p}
                            type="button"
                            onClick={() => field.onChange(p)}
                            className={cn(
                              "h-7 w-7 sm:h-8 sm:w-8 rounded-md border text-xs font-semibold transition-colors cursor-pointer",
                              field.value === p ? classes.selected : classes.idle,
                            )}
                          >
                            {p}
                          </button>
                        ))}
                      </div>
                      <span
                        className={cn(
                          "text-center text-[10px] font-medium transition-colors",
                          isGroupActive ? classes.activeLabel : "text-muted-foreground/60",
                        )}
                      >
                        {group.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          />
        </div>
      </div>

      <Separator />

      <div className="px-6 py-3 sm:py-4">
        <div className="flex flex-col gap-2 sm:gap-3">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Due date
          </span>
          <Controller
            name={"dueDate" as Path<T>}
            control={control}
            render={({ field, fieldState }) => (
              <div className="flex flex-col gap-1">
                <DatePicker
                  value={field.value as string | null | undefined}
                  onChange={field.onChange}
                  placeholder="No due date"
                />
                <FieldError errors={[fieldState.error]} />
              </div>
            )}
          />
        </div>
      </div>
    </>
  );
}

export { TaskFormFields };
