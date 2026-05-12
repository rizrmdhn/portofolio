import { Badge } from "@/components/ui/badge";
import type { TablerIcon } from "@tabler/icons-react";
import { IconAlignLeft } from "@tabler/icons-react";
import type {
  ColumnDef,
  ColumnMeta,
  Row,
  RowData,
} from "@tanstack/react-table";
import type { FilterVariant } from "@portofolio/types/data-table.types";
import { format } from "date-fns";
import { cn } from "./utils";

type NestedKeyOf<T> = {
  [K in keyof T & string]: T[K] extends object
    ? T[K] extends Array<unknown>
      ? K
      : K | `${K}.${NestedKeyOf<T[K]>}`
    : K;
}[keyof T & string];

interface NumberColumnOptions {
  width?: string;
}

export function createNumberColumn<T>(
  currentPage: number,
  perPage: number,
  options: NumberColumnOptions = {},
): ColumnDef<T> {
  const { width = "w-12" } = options;

  return {
    id: "no",
    header: () => <span className="font-medium">No</span>,
    cell: ({ row }) => (
      <div className={width}>{row.index + 1 + (currentPage - 1) * perPage}</div>
    ),
  };
}

interface TextColumnOptions {
  width?: string;
  enableFilter?: boolean;
  placeholder?: string;
  variant?: FilterVariant;
  icon?: TablerIcon;
  nullable?: boolean;
}

export function createTextColumn<T extends RowData>(
  id: Extract<NestedKeyOf<T>, string>,
  label: string,
  options: TextColumnOptions = {},
): ColumnDef<T> {
  const {
    width = "w-48",
    enableFilter = false,
    placeholder = `Cari ${label.toLowerCase()}...`,
    variant = "text",
    icon = IconAlignLeft,
    nullable = false,
  } = options;

  const meta: ColumnMeta<T, unknown> = enableFilter
    ? { label, placeholder, variant, icon }
    : { label };

  return {
    id,
    accessorKey: id,
    header: () => <span className="font-medium">{label}</span>,
    cell: ({ row }) => (
      <div className={`${width} truncate`} title={row.getValue(id)}>
        {row.getValue(id) ?? (nullable ? "-" : "")}
      </div>
    ),
    meta,
    enableColumnFilter: enableFilter,
  };
}

interface BadgeColumnOptions {
  width?: string;
  enableFilter?: boolean;
  placeholder?: string;
  variant?: FilterVariant;
  icon?: TablerIcon;
  valueIsBoolean?: boolean;
}

export function createBadgeColumn<T extends RowData>(
  id: Extract<NestedKeyOf<T>, string>,
  label: string,
  options: BadgeColumnOptions = {},
): ColumnDef<T> {
  const {
    width = "w-48",
    enableFilter = false,
    placeholder = `Cari ${label.toLowerCase()}...`,
    variant = "text",
    icon = IconAlignLeft,
    valueIsBoolean = false,
  } = options;

  const meta: ColumnMeta<T, string> = enableFilter
    ? { label, placeholder, variant, icon }
    : { label };

  return {
    id,
    accessorKey: id,
    header: () => <span className="font-medium">{label}</span>,
    cell: ({ row }) => {
      const value = valueIsBoolean
        ? Boolean(row.getValue(id))
        : row.getValue(id);

      return (
        <div className={width}>
          <Badge
            variant="secondary"
            className={cn(
              value ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800",
            )}
          >
            {String(value)}
          </Badge>
        </div>
      );
    },
    meta,
    enableColumnFilter: enableFilter,
  };
}

interface StatusColumnOptions {
  width?: string;
  enableFilter?: boolean;
  placeholder?: string;
  variant?: FilterVariant;
  icon?: TablerIcon;
  valueIsBoolean?: boolean;
  statusMap: Record<
    string,
    {
      text: string;
      color?: "green" | "red" | "blue" | "yellow" | "gray" | "custom";
      customColors?: string;
    }
  >;
}

export function createStatusColumn<T extends RowData>(
  id: Extract<NestedKeyOf<T>, string>,
  label: string,
  options: StatusColumnOptions,
): ColumnDef<T> {
  const {
    width = "w-48",
    enableFilter = false,
    placeholder = `Cari ${label.toLowerCase()}...`,
    variant = "text",
    icon = IconAlignLeft,
    valueIsBoolean = false,
    statusMap,
  } = options;

  const meta: ColumnMeta<T, string> = enableFilter
    ? { label, placeholder, variant, icon }
    : { label };

  return {
    id,
    accessorKey: id,
    header: () => <span className="font-medium">{label}</span>,
    cell: ({ row }) => {
      const value = valueIsBoolean
        ? Boolean(row.getValue(id))
        : row.getValue(id);

      const status = statusMap[String(value)] ?? { text: String(value), color: "gray" as const };

      return (
        <div className={width}>
          <Badge
            variant="secondary"
            className={cn(
              status.color === "green" && "bg-green-100 text-green-800",
              status.color === "red" && "bg-red-100 text-red-800",
              status.color === "blue" && "bg-blue-100 text-blue-800",
              status.color === "yellow" && "bg-yellow-100 text-yellow-800",
              status.color === "gray" && "bg-gray-100 text-gray-800",
              status.customColors,
            )}
          >
            {status.text}
          </Badge>
        </div>
      );
    },
    meta,
    enableColumnFilter: enableFilter,
  };
}

export function createPriceColumn<T extends RowData>(
  id: Extract<NestedKeyOf<T>, string>,
  label: string,
  options: TextColumnOptions = {},
): ColumnDef<T> {
  const {
    width = "w-48",
    enableFilter = false,
    placeholder = `Cari ${label.toLowerCase()}...`,
    variant = "text",
    icon = IconAlignLeft,
  } = options;

  const meta: ColumnMeta<T, unknown> = enableFilter
    ? { label, placeholder, variant, icon }
    : { label };

  return {
    id,
    accessorKey: id,
    header: () => <span className="font-medium">{label}</span>,
    cell: ({ row }) => {
      const value = row.getValue(id);
      const formattedPrice = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
      }).format(Number(value));
      return (
        <div className={`${width} truncate`} title={formattedPrice}>
          {formattedPrice}
        </div>
      );
    },
    meta,
    enableColumnFilter: enableFilter,
  };
}

interface DateColumnOptions {
  nullable?: boolean;
  format?: string;
}

export function createDateColumn<T extends RowData>(
  id: Extract<NestedKeyOf<T>, string>,
  label: string,
  options: DateColumnOptions = {},
): ColumnDef<T> {
  const { nullable = false, format: dateFormat = "dd/MM/yyyy" } = options;

  return {
    id,
    accessorKey: id,
    header: () => <span className="font-medium">{label}</span>,
    cell: ({ row }) => {
      const value = row.getValue(id);
      if (!value && nullable) return <span>-</span>;
      return <span>{format(new Date(value as string), dateFormat)}</span>;
    },
    meta: { label },
  };
}

export function createActionColumn<T>(
  cellRenderer: (props: { row: Row<T> }) => React.ReactNode,
): ColumnDef<T> {
  return {
    id: "action",
    header: () => <span className="font-medium">Aksi</span>,
    cell: ({ row }) => cellRenderer({ row }),
  };
}
