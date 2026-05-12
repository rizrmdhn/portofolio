import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { globalErrorToast, globalSuccessToast } from "@/lib/toasts";
import { trpc } from "@/utils/trpc";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  PROFICIENCY_LABELS,
  PROFICIENCY_LEVELS,
  ProficiencyLevel,
} from "@portofolio/constants";
import { IconGripVertical, IconPlus, IconTrash } from "@tabler/icons-react";
import { useForm } from "@tanstack/react-form";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useId } from "react";

export const Route = createFileRoute(
  "/(core)/dashboard/tech-stack/$techStackId/edit",
)({
  beforeLoad: async ({ params, context }) => {
    await context.queryClient.ensureQueryData(
      context.trpc.techStack.getById.queryOptions({
        id: params.techStackId,
      }),
    );
  },
  component: RouteComponent,
});

type ItemField = {
  _id: string;      // local DnD key
  id?: string;      // db id — present for existing items, absent for new ones
  name: string;
  proficiency: ProficiencyLevel;
};

function SortableItem({
  item,
  index,
  onNameChange,
  onProficiencyChange,
  onRemove,
  nameError,
}: {
  item: ItemField;
  index: number;
  onNameChange: (value: string) => void;
  onProficiencyChange: (value: ProficiencyLevel) => void;
  onRemove: () => void;
  nameError?: string;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: item._id });

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
      }}
      className="flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2"
    >
      <button
        type="button"
        className="text-muted-foreground/40 cursor-grab active:cursor-grabbing hover:text-muted-foreground shrink-0"
        {...attributes}
        {...listeners}
      >
        <IconGripVertical className="size-4" />
      </button>

      <div className="flex flex-1 flex-col gap-1 min-w-0">
        <Input
          value={item.name}
          onChange={(e) => onNameChange(e.target.value)}
          placeholder={`Item ${index + 1}`}
          className="h-7 text-sm"
          aria-invalid={!!nameError}
        />
        {nameError && <p className="text-xs text-destructive">{nameError}</p>}
      </div>

      <Select
        value={String(item.proficiency)}
        onValueChange={(v) =>
          onProficiencyChange(Number(v) as ProficiencyLevel)
        }
      >
        <SelectTrigger className="h-7 w-46 shrink-0 text-xs">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {PROFICIENCY_LEVELS.map((level) => (
            <SelectItem key={level} value={String(level)} className="text-xs">
              Proficiency {level} · {PROFICIENCY_LABELS[level]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="size-7 shrink-0 text-muted-foreground hover:text-destructive"
        onClick={onRemove}
      >
        <IconTrash className="size-3.5" />
      </Button>
    </div>
  );
}

function RouteComponent() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const dndId = useId();

  const { techStackId } = Route.useParams();
  const { data: category } = useSuspenseQuery(
    trpc.techStack.getById.queryOptions({ id: techStackId }),
  );

  const updateMutation = useMutation(
    trpc.techStack.updateCategoryWithItems.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.techStack.getForDashboard.queryFilter(),
        );
        await queryClient.invalidateQueries(
          trpc.techStack.getById.queryFilter(),
        );
        globalSuccessToast("Tech stack category updated!");
        router.history.back();
      },
      onError: (err) => globalErrorToast(err.message),
    }),
  );

  const form = useForm({
    defaultValues: {
      name: category.name,
      items: category.items.map((item) => ({
        _id: item.id,
        id: item.id,
        name: item.name,
        proficiency: item.proficiency as ProficiencyLevel,
      })) as ItemField[],
    },
    onSubmit: async ({ value }) => {
      await updateMutation.mutateAsync({
        id: techStackId,
        name: value.name,
        items: value.items.map(({ _id: _, ...item }, index) => ({
          ...item,
          order: index,
        })),
      });
    },
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  return (
    <div className="flex min-h-[calc(100svh-var(--header-height)-2rem)] flex-1 flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h2 className="text-base font-bold text-foreground">
          Edit Tech Stack Category
        </h2>
        <p className="text-xs text-muted-foreground">
          Update the category name and manage its items.
        </p>
      </div>

      <div className="flex-1 flex">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="flex flex-1 w-full flex-col overflow-hidden"
        >
          <ScrollArea className="min-h-0 flex-1">
            <div className="p-4">
              <FieldGroup className="gap-6">
                {/* Category Name */}
                <form.Field
                  name="name"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field
                        data-invalid={isInvalid}
                        className="flex flex-col gap-1.5"
                      >
                        <FieldLabel htmlFor={field.name}>
                          Category Name
                        </FieldLabel>
                        <Input
                          id={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          aria-invalid={isInvalid}
                          placeholder="e.g. Frontend, DevOps"
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                />

                {/* Items */}
                <form.Field
                  name="items"
                  children={(field) => {
                    const items = field.state.value as ItemField[];

                    function handleDragEnd(event: DragEndEvent) {
                      const { active, over } = event;
                      if (!over || active.id === over.id) return;
                      const oldIndex = items.findIndex(
                        (i) => i._id === active.id,
                      );
                      const newIndex = items.findIndex(
                        (i) => i._id === over.id,
                      );
                      if (oldIndex === -1 || newIndex === -1) return;
                      field.handleChange(arrayMove(items, oldIndex, newIndex));
                    }

                    function addItem() {
                      field.handleChange([
                        ...items,
                        {
                          _id: crypto.randomUUID(),
                          name: "",
                          proficiency: 1 as ProficiencyLevel,
                        },
                      ]);
                    }

                    function removeItem(index: number) {
                      field.handleChange(items.filter((_, i) => i !== index));
                    }

                    return (
                      <Field className="flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                          <FieldLabel>Items</FieldLabel>
                          <p className="text-xs text-muted-foreground">
                            Drag to reorder · Press Enter to add
                          </p>
                        </div>

                        <DndContext
                          id={dndId}
                          sensors={sensors}
                          collisionDetection={closestCenter}
                          onDragEnd={handleDragEnd}
                        >
                          <SortableContext
                            items={items.map((i) => i._id)}
                            strategy={verticalListSortingStrategy}
                          >
                            <div className="flex flex-col gap-1.5">
                              {items.map((item, index) => (
                                <SortableItem
                                  key={item._id}
                                  item={item}
                                  index={index}
                                  onNameChange={(value) =>
                                    field.handleChange(
                                      items.map((it, i) =>
                                        i === index
                                          ? { ...it, name: value }
                                          : it,
                                      ),
                                    )
                                  }
                                  onProficiencyChange={(value) =>
                                    field.handleChange(
                                      items.map((it, i) =>
                                        i === index
                                          ? { ...it, proficiency: value }
                                          : it,
                                      ),
                                    )
                                  }
                                  onRemove={() => removeItem(index)}
                                />
                              ))}
                            </div>
                          </SortableContext>
                        </DndContext>

                        <Button
                          type="button"
                          variant="outline"
                          className="w-full border-dashed"
                          onClick={addItem}
                        >
                          <IconPlus className="size-4" />
                          Add item
                        </Button>
                      </Field>
                    );
                  }}
                />
              </FieldGroup>
            </div>
          </ScrollArea>

          <Separator />

          <footer className="flex shrink-0 items-center justify-end p-4 gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.history.back()}
            >
              Cancel
            </Button>
            <form.Subscribe
              selector={(state) => state.isSubmitting}
              children={(isSubmitting) => (
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? <Spinner data-icon="inline-start" /> : null}
                  Save Changes
                </Button>
              )}
            />
          </footer>
        </form>
      </div>
    </div>
  );
}
