"use client"

import * as React from "react"
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core"
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { IconGripVertical } from "@tabler/icons-react"
import { flexRender, type Row, type Table } from "@tanstack/react-table"

import { cn } from "@/lib/utils"
import { EmptyState, type EmptyStateAction } from "@/components/ui/empty-state"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Table as UITable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { TablerIcon } from "@tabler/icons-react"

interface DataTableProps<TData> {
  table: Table<TData>
  isLoading?: boolean
  error?: { message: string } | null
  emptyMessage?: string
  emptyDescription?: string
  emptyIcon?: TablerIcon | React.ReactNode
  emptyActions?: EmptyStateAction[]
  className?: string
  children?: React.ReactNode
  onReorder?: (items: TData[]) => void
}

function DraggableRow<TData>({ row }: { row: Row<TData> }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: row.id })

  return (
    <TableRow
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        position: isDragging ? "relative" : undefined,
        zIndex: isDragging ? 1 : undefined,
      }}
      data-state={row.getIsSelected() ? "selected" : undefined}
    >
      <TableCell className="w-8 px-2">
        <button
          {...attributes}
          {...listeners}
          className="flex cursor-grab items-center text-muted-foreground active:cursor-grabbing hover:text-foreground"
        >
          <IconGripVertical className="size-4" />
        </button>
      </TableCell>
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  )
}

export function DataTable<TData>({
  table,
  isLoading,
  error,
  emptyMessage = "No data found.",
  emptyDescription,
  emptyIcon,
  emptyActions,
  className,
  children,
  onReorder,
}: DataTableProps<TData>) {
  const rows = table.getRowModel().rows
  const colSpan = table.getAllColumns().length + (onReorder ? 1 : 0)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  )

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over || active.id === over.id) return

    const allRows = rows.map((r) => r.original)
    const oldIndex = allRows.findIndex((_, i) => rows[i].id === String(active.id))
    const newIndex = allRows.findIndex((_, i) => rows[i].id === String(over.id))
    if (oldIndex === -1 || newIndex === -1) return

    const reordered = [...allRows]
    reordered.splice(newIndex, 0, reordered.splice(oldIndex, 1)[0])
    onReorder?.(reordered)
  }

  const tableBody = (
    <TableBody>
      {isLoading ? (
        Array.from({ length: 5 }).map((_, i) => (
          <TableRow key={i}>
            {Array.from({ length: colSpan }).map((_, j) => (
              <TableCell key={j}>
                <Skeleton className="h-4 w-full" />
              </TableCell>
            ))}
          </TableRow>
        ))
      ) : error ? (
        <TableRow>
          <TableCell colSpan={colSpan} className="h-24 text-center text-destructive">
            {error.message}
          </TableCell>
        </TableRow>
      ) : rows.length === 0 ? (
        <TableRow className="hover:bg-transparent">
          <TableCell colSpan={colSpan}>
            <EmptyState
              icon={emptyIcon}
              title={emptyMessage}
              description={emptyDescription ?? ""}
              actions={emptyActions}
            />
          </TableCell>
        </TableRow>
      ) : onReorder ? (
        rows.map((row) => <DraggableRow key={row.id} row={row} />)
      ) : (
        rows.map((row) => (
          <TableRow key={row.id} data-state={row.getIsSelected() ? "selected" : undefined}>
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))
      )}
    </TableBody>
  )

  const table_ = (
    <UITable>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id} className="hover:bg-transparent">
            {onReorder && <TableHead className="w-8 px-2" />}
            {headerGroup.headers.map((header) => (
              <TableHead key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(header.column.columnDef.header, header.getContext())}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      {onReorder ? (
        <SortableContext
          items={rows.map((r) => r.id)}
          strategy={verticalListSortingStrategy}
        >
          {tableBody}
        </SortableContext>
      ) : (
        tableBody
      )}
    </UITable>
  )

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {children}
      {onReorder ? (
        <DndContext
          id="data-table-dnd"
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          {table_}
        </DndContext>
      ) : (
        table_
      )}
    </div>
  )
}
