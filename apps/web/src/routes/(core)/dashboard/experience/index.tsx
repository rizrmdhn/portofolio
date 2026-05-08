import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { trpc } from "@/utils/trpc";
import { IconPlus, IconSearch } from "@tabler/icons-react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

export const Route = createFileRoute("/(core)/dashboard/experience/")({
  validateSearch: z.object({
    search: z.string().optional(),
  }),
  beforeLoad: async ({ search, context }) => {
    await context.queryClient.ensureQueryData(
      context.trpc.experience.getForDashboard.queryOptions(search),
    );
  },
  component: RouteComponent,
});

function RouteComponent() {
  const params = Route.useSearch();

  const { data } = useSuspenseQuery(
    trpc.experience.getForDashboard.queryOptions(params),
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <InputGroup className="max-w-xs">
          <InputGroupInput placeholder="Search..." />
          <InputGroupAddon>
            <IconSearch />
          </InputGroupAddon>
          <InputGroupAddon align="inline-end">12 results</InputGroupAddon>
        </InputGroup>
        {/* Add button or other controls can go here */}
        <Button>
          <IconPlus />
          Add Experience
        </Button>
      </div>
      <div className="flex flex-col gap-2">
        {data.map((item) => (
          <div key={item.id} className="rounded border p-4">
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="text-sm text-gray-600">{item.company}</p>
            <p className="text-sm text-gray-500">
              {item.startDate} - {item.endDate ?? "Present"}
            </p>
            <p className="mt-2 text-gray-700">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
