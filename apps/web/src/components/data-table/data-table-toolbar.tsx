import * as React from "react"
import type { Table } from "@tanstack/react-table"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  children?: React.ReactNode
}

export function DataTableToolbar<TData>({
  children,
}: DataTableToolbarProps<TData>) {
  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex flex-1 items-center gap-2 flex-wrap">{children}</div>
    </div>
  )
}
