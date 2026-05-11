import { SocialLinkCard } from "@/components/dashboard/social-link-card";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Skeleton } from "@/components/ui/skeleton";
import useDebounced from "@/hooks/use-debounced";
import { useOptimisticMutation } from "@/lib/optimistic-update";
import { globalErrorToast } from "@/lib/toasts";
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
  rectSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { SocialLink } from "@portofolio/types/social-links.types";
import { IconAt, IconPlus, IconSearch, IconX } from "@tabler/icons-react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import z from "zod";

export const Route = createFileRoute("/(core)/dashboard/social-links/")({
  validateSearch: z.object({
    search: z.string().optional(),
  }),
  beforeLoad: async ({ search, context }) => {
    await context.queryClient.ensureQueryData(
      context.trpc.socialLink.getForDashboard.queryOptions(search),
    );
  },
  pendingComponent: SocialLinkListSkeleton,
  component: RouteComponent,
});

function SortableSocialLinkCard({ socialLink }: { socialLink: SocialLink }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: socialLink.id });

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        zIndex: isDragging ? 1 : undefined,
        position: isDragging ? "relative" : undefined,
      }}
    >
      <SocialLinkCard
        socialLink={socialLink}
        dragHandleProps={{ ...attributes, ...listeners }}
      />
    </div>
  );
}

function SocialLinkListSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-9 w-72" /> {/* search bar */}
        <Skeleton className="h-9 w-32" /> {/* add button */}
      </div>
      <div className="grid grid-cols-3 gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-18 w-full rounded-lg" />
        ))}
      </div>
    </div>
  );
}

function RouteComponent() {
  const params = Route.useSearch();
  const navigate = Route.useNavigate();
  const [search, setSearch] = useState(params.search ?? "");
  const debouncedSearch = useDebounced(search, 300);

  useEffect(() => {
    navigate({
      search: (prev) => ({ ...prev, search: debouncedSearch || undefined }),
      replace: true,
    });
  }, [debouncedSearch]);

  const { data } = useSuspenseQuery(
    trpc.socialLink.getForDashboard.queryOptions(params),
  );

  const reorder = useOptimisticMutation(
    trpc.socialLink.reorder.mutationOptions(),
    {
      queryOptions: trpc.socialLink.getForDashboard.queryOptions(params),
      operation: {
        type: "reorder",
        getOrder: (input) => input,
      },
      onError: (err) => {
        globalErrorToast(`Failed to reorder social links: ${err.message}`);
      },
    },
  );

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = data.findIndex((item) => item.id === active.id);
    const newIndex = data.findIndex((item) => item.id === over.id);
    if (oldIndex === -1 || newIndex === -1) return;

    const reordered = arrayMove(data, oldIndex, newIndex);
    reorder.mutate(reordered.map((item, i) => ({ id: item.id, order: i })));
  }

  const renderList = () => {
    if (data.length === 0) {
      return (
        <EmptyState
          icon={IconAt}
          title="Your social links are empty"
          description={
            params.search
              ? `No results for "${params.search}"`
              : "Add your first social link to get started."
          }
          actions={[
            {
              icon: IconPlus,
              label: "Add Social Link",
              onClick: () => {},
            },
          ]}
        />
      );
    }

    return (
      <div className="grid grid-cols-5 gap-2">
        <DndContext
          id="social-links-id"
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={data.map((item) => item.id)}
            strategy={rectSortingStrategy}
          >
            {data.map((item) => (
              <SortableSocialLinkCard key={item.id} socialLink={item} />
            ))}
          </SortableContext>
        </DndContext>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <InputGroup className="max-w-xs">
          <InputGroupAddon>
            <IconSearch />
          </InputGroupAddon>
          <InputGroupInput
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Escape" && setSearch("")}
          />
          {search && (
            <InputGroupAddon align="inline-end">
              <InputGroupButton size="icon-xs" onClick={() => setSearch("")}>
                <IconX />
              </InputGroupButton>
            </InputGroupAddon>
          )}
          <InputGroupAddon align="inline-end">
            {data.length} results
          </InputGroupAddon>
        </InputGroup>
        <Button>
          <IconPlus />
          Add Social Link
        </Button>
      </div>
      {renderList()}
    </div>
  );
}
