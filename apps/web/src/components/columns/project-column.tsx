import { Button } from "@/components/ui/button";
import {
  createActionColumn,
  createDateColumn,
  createStatusColumn,
  createTextColumn,
} from "@/lib/column-helpers";
import type { PaginatedProjects } from "@portofolio/types/project.types";
import { IconEye } from "@tabler/icons-react";
import type { useNavigate } from "@tanstack/react-router";
import type { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarFallback } from "../ui/avatar";

interface ProjectColumnProps {
  navigate: ReturnType<typeof useNavigate>;
}

export default function getProjectsColumns({ navigate }: ProjectColumnProps): ColumnDef<PaginatedProjects>[] {

  return [
    {
      id: "order",
      accessorKey: "order",
      enableSorting: true,
      enableHiding: false,
      header: () => null,
      cell: () => null,
    },
    {
      id: "title",
      accessorKey: "title",
      header: () => <span className="font-medium">Project</span>,
      cell: ({ row }) => (
        <div className="flex items-center gap-2 flex-row">
          <Avatar className="rounded-sm after:rounded-sm">
            <AvatarFallback className="rounded-sm">
              {/* should get initial from title atleast 2 characters */}
              {row.getValue<string>("title").slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span>{row.getValue<string>("title")}</span>
        </div>
      ),
      meta: { label: "Project" },
    },
    createTextColumn<PaginatedProjects>("description", "Description", {
      width: "w-52",
      nullable: true,
    }),
    createStatusColumn<PaginatedProjects>("status", "Status", {
      statusMap: {
        published: { text: "Published", color: "green" },
        draft: { text: "Draft", color: "yellow" },
        archived: { text: "Archived", color: "gray" },
      },
    }),
    {
      id: "views",
      accessorKey: "views",
      header: () => <span className="font-medium">Views</span>,
      cell: ({ row }) => (
        <span className="tabular-nums">
          {row.getValue<number>("views").toLocaleString()}
        </span>
      ),
      meta: { label: "Views" },
    },
    createDateColumn<PaginatedProjects>("createdAt", "Created", {
      format: "dd MMM yyyy",
    }),
    createDateColumn<PaginatedProjects>("updatedAt", "Updated", {
      nullable: true,
      format: "dd MMM yyyy",
    }),
    createActionColumn<PaginatedProjects>(({ row }) => (
      <Button
        variant="ghost"
        size="icon-sm"
        title="View"
        onClick={() =>
          navigate({
            to: "/dashboard/projects/$projectId/edit",
            params: { projectId: row.original.id },
          })
        }
      >
        <IconEye />
      </Button>
    )),
  ];
}
