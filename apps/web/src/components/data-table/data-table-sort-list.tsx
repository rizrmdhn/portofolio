import { IconArrowDown, IconArrowUp, IconX } from '@tabler/icons-react'
import type { Table } from '@tanstack/react-table'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

interface DataTableSortListProps<TData> {
  table: Table<TData>
}

export function DataTableSortList<TData>({ table }: DataTableSortListProps<TData>) {
  const sorting = table.getState().sorting

  if (sorting.length === 0) return null

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {sorting.map((sort) => {
        // const column = table.getColumn(sort.id)
        // const label =
        //   (column?.columnDef.meta)?.label ??
        //   sort.id

        return (
          <Badge
            key={sort.id}
            variant="outline"
            className="h-5 gap-1 py-0.5 pr-1 pl-1.5 text-[0.625rem]"
          >
            {sort.desc ? (
              <IconArrowDown className="size-2.5" />
            ) : (
              <IconArrowUp className="size-2.5" />
            )}
            {/* {label} */}
            <button
              onClick={() => table.setSorting((prev) => prev.filter((s) => s.id !== sort.id))}
              className="hover:text-foreground ml-0.5 rounded-full"
            >
              <IconX className="size-2.5" />
            </button>
          </Badge>
        )
      })}

      {sorting.length > 1 && (
        <Button variant="ghost" size="xs" onClick={() => table.setSorting([])}>
          Clear all
        </Button>
      )}
    </div>
  )
}
