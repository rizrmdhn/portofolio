import {
  createActionColumn,
  createDateColumn,
  createNumberColumn,
  createStatusColumn,
  createTextColumn,
} from "@/lib/column-helpers";
import { Button } from "@/components/ui/button";
import type { PaginatedProjects } from "@portofolio/types/project.types";
import { IconEye } from "@tabler/icons-react";
import type { ColumnDef } from "@tanstack/react-table";

interface ProjectColumnProps {
  currentPage: number;
  perPage: number;
}

export default function getProjectsColumns({
  currentPage,
  perPage,
}: ProjectColumnProps): ColumnDef<PaginatedProjects>[] {
  return [
    createNumberColumn<PaginatedProjects>(currentPage, perPage),
    createTextColumn<PaginatedProjects>("title", "Project", { width: "w-64" }),
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
    createActionColumn<PaginatedProjects>(({ row: _ }) => (
      <Button variant="ghost" size="icon-sm" title="View">
        <IconEye />
      </Button>
    )),
  ];
}
