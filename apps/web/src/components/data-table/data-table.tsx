"use client"

import * as React from "react"
import { flexRender, type Table } from "@tanstack/react-table"

import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Table as UITable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface DataTableProps<TData> {
  table: Table<TData>
  isLoading?: boolean
  error?: { message: string } | null
  emptyMessage?: string
  emptyDescription?: string
  className?: string
  children?: React.ReactNode
}

export function DataTable<TData>({
  table,
  isLoading,
  error,
  emptyMessage = "No data found.",
  emptyDescription,
  className,
  children,
}: DataTableProps<TData>) {
  const rows = table.getRowModel().rows
  const colSpan = table.getAllColumns().length

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {children}
      <UITable>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="hover:bg-transparent">
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
              <TableCell colSpan={colSpan} className="h-24 text-center">
                <p className="text-sm font-medium">{emptyMessage}</p>
                {emptyDescription && (
                  <p className="mt-1 text-xs text-muted-foreground">{emptyDescription}</p>
                )}
              </TableCell>
            </TableRow>
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
      </UITable>
    </div>
  )
}
