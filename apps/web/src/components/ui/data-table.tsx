"use client"

import * as React from "react"
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import {
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
  IconChevronUp,
  IconGripVertical,
  IconSelector,
} from "@tabler/icons-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

// ─── Types ────────────────────────────────────────────────────────────────────

export interface SortState {
  id: string
  desc: boolean
}

export interface DataTableColumn<TData> {
  id: string
  header?: React.ReactNode
  cell: (row: TData) => React.ReactNode
  className?: string
  headerClassName?: string
  sortable?: boolean
}

interface DataTableProps<TData extends { id: string }> {
  columns: DataTableColumn<TData>[]
  data: TData[]
  // DnD
  draggable?: boolean
  onReorder?: (items: TData[]) => void
  // Pagination
  page?: number
  pageCount?: number
  onPageChange?: (page: number) => void
  perPage?: number
  onPerPageChange?: (perPage: number) => void
  // Sort
  sort?: SortState[]
  onSortChange?: (sort: SortState[]) => void
  className?: string
  emptyMessage?: string
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const PER_PAGE_OPTIONS = [10, 20, 30, 50]

function getPageRange(current: number, total: number): (number | "...")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)

  const left = Math.max(2, current - 1)
  const right = Math.min(total - 1, current + 1)
  const pages: (number | "...")[] = [1]

  if (left > 2) pages.push("...")
  for (let i = left; i <= right; i++) pages.push(i)
  if (right < total - 1) pages.push("...")
  pages.push(total)

  return pages
}

// ─── SortableRow ──────────────────────────────────────────────────────────────

function SortableRow<TData extends { id: string }>({
  row,
  columns,
}: {
  row: TData
  columns: DataTableColumn<TData>[]
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: row.id })

  return (
    <TableRow
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={cn(isDragging && "opacity-50 bg-muted/50 shadow-sm")}
    >
      <TableCell className="w-8 px-2">
        <button
          className="flex cursor-grab items-center justify-center touch-none text-muted-foreground/50 hover:text-muted-foreground active:cursor-grabbing"
          {...attributes}
          {...listeners}
        >
          <IconGripVertical className="size-3.5" />
        </button>
      </TableCell>
      {columns.map((col) => (
        <TableCell key={col.id} className={col.className}>
          {col.cell(row)}
        </TableCell>
      ))}
    </TableRow>
  )
}

// ─── SortHeader ───────────────────────────────────────────────────────────────

function SortHeader({
  id,
  header,
  sortable,
  sort,
  onSortChange,
}: {
  id: string
  header?: React.ReactNode
  sortable?: boolean
  sort?: SortState[]
  onSortChange?: (sort: SortState[]) => void
}) {
  if (!sortable) return <>{header}</>

  const current = sort?.find((s) => s.id === id)

  function handleClick() {
    if (!onSortChange) return
    if (!current) {
      onSortChange([{ id, desc: false }])
    } else if (!current.desc) {
      onSortChange([{ id, desc: true }])
    } else {
      onSortChange([])
    }
  }

  return (
    <button
      onClick={handleClick}
      className="flex items-center gap-1 hover:text-foreground"
    >
      {header}
      {!current && (
        <IconSelector className="size-3 text-muted-foreground/40" />
      )}
      {current && !current.desc && <IconChevronUp className="size-3" />}
      {current && current.desc && <IconChevronDown className="size-3" />}
    </button>
  )
}

// ─── DataTablePagination ──────────────────────────────────────────────────────

function DataTablePagination({
  page,
  pageCount,
  onPageChange,
  perPage,
  onPerPageChange,
  colSpan,
}: {
  page: number
  pageCount: number
  onPageChange: (page: number) => void
  perPage?: number
  onPerPageChange?: (perPage: number) => void
  colSpan: number
}) {
  const pages = getPageRange(page, pageCount)

  return (
    <TableFooter className="bg-transparent">
      <TableRow className="hover:bg-transparent border-0">
        <TableCell colSpan={colSpan} className="py-3">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              {onPerPageChange && perPage !== undefined && (
                <>
                  <span>Rows per page</span>
                  <Select
                    value={String(perPage)}
                    onValueChange={(v) => onPerPageChange(Number(v))}
                  >
                    <SelectTrigger size="sm" className="w-16">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {PER_PAGE_OPTIONS.map((n) => (
                        <SelectItem key={n} value={String(n)}>
                          {n}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </>
              )}
            </div>

            <div className="flex items-center gap-0.5">
              <Button
                variant="ghost"
                size="icon-sm"
                disabled={page <= 1}
                onClick={() => onPageChange(page - 1)}
              >
                <IconChevronLeft />
              </Button>

              {pages.map((p, i) =>
                p === "..." ? (
                  <span
                    key={`ellipsis-${i}`}
                    className="flex size-6 items-center justify-center text-xs text-muted-foreground"
                  >
                    …
                  </span>
                ) : (
                  <Button
                    key={p}
                    variant={p === page ? "outline" : "ghost"}
                    size="icon-sm"
                    onClick={() => onPageChange(p as number)}
                  >
                    {p}
                  </Button>
                ),
              )}

              <Button
                variant="ghost"
                size="icon-sm"
                disabled={page >= pageCount}
                onClick={() => onPageChange(page + 1)}
              >
                <IconChevronRight />
              </Button>
            </div>
          </div>
        </TableCell>
      </TableRow>
    </TableFooter>
  )
}

// ─── DataTable ────────────────────────────────────────────────────────────────

export function DataTable<TData extends { id: string }>({
  columns,
  data,
  draggable = false,
  onReorder,
  page,
  pageCount,
  onPageChange,
  perPage,
  onPerPageChange,
  sort,
  onSortChange,
  className,
  emptyMessage = "No results.",
}: DataTableProps<TData>) {
  const [items, setItems] = React.useState<TData[]>(data)

  React.useEffect(() => {
    setItems(data)
  }, [data])

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over || active.id === over.id) return

    setItems((prev) => {
      const oldIndex = prev.findIndex((item) => item.id === active.id)
      const newIndex = prev.findIndex((item) => item.id === over.id)
      const next = arrayMove(prev, oldIndex, newIndex)
      onReorder?.(next)
      return next
    })
  }

  const hasPagination =
    page !== undefined && pageCount !== undefined && onPageChange !== undefined

  const totalCols = columns.length + (draggable ? 1 : 0)

  const headerRow = (
    <TableRow className="hover:bg-transparent">
      {draggable && <TableHead className="w-8" />}
      {columns.map((col) => (
        <TableHead key={col.id} className={col.headerClassName}>
          <SortHeader
            id={col.id}
            header={col.header}
            sortable={col.sortable}
            sort={sort}
            onSortChange={onSortChange}
          />
        </TableHead>
      ))}
    </TableRow>
  )

  const emptyRow = (
    <TableRow className="hover:bg-transparent">
      <TableCell
        colSpan={totalCols}
        className="h-24 text-center text-muted-foreground"
      >
        {emptyMessage}
      </TableCell>
    </TableRow>
  )

  const pagination = hasPagination ? (
    <DataTablePagination
      page={page}
      pageCount={pageCount}
      onPageChange={onPageChange}
      perPage={perPage}
      onPerPageChange={onPerPageChange}
      colSpan={totalCols}
    />
  ) : null

  if (!draggable) {
    return (
      <Table className={className}>
        <TableHeader>{headerRow}</TableHeader>
        <TableBody>
          {items.length === 0
            ? emptyRow
            : items.map((row) => (
                <TableRow key={row.id}>
                  {columns.map((col) => (
                    <TableCell key={col.id} className={col.className}>
                      {col.cell(row)}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
        </TableBody>
        {pagination}
      </Table>
    )
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <Table className={className}>
        <TableHeader>{headerRow}</TableHeader>
        <TableBody>
          {items.length === 0 ? (
            emptyRow
          ) : (
            <SortableContext
              items={items.map((item) => item.id)}
              strategy={verticalListSortingStrategy}
            >
              {items.map((row) => (
                <SortableRow key={row.id} row={row} columns={columns} />
              ))}
            </SortableContext>
          )}
        </TableBody>
        {pagination}
      </Table>
    </DndContext>
  )
}
