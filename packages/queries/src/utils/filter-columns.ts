import {
  and,
  between,
  eq,
  gt,
  gte,
  ilike,
  inArray,
  isNotNull,
  isNull,
  lt,
  lte,
  ne,
  notIlike,
  notInArray,
  or,
  type SQL,
  type Table,
} from "@portofolio/db"
import type { FilterSchema } from "@portofolio/schema/filter.schema"
import type { JoinOperator } from "@portofolio/types/data-table.types"

interface FilterColumnsOptions<T extends Table> {
  table: T
  filters: FilterSchema[]
  joinOperator: JoinOperator
}

export function filterColumns<T extends Table>({
  table,
  filters,
  joinOperator,
}: FilterColumnsOptions<T>): SQL | undefined {
  if (filters.length === 0) return undefined

  const conditions = filters
    .map((filter) => {
      const column = (table as Record<string, unknown>)[filter.id] as SQL

      switch (filter.operator) {
        case "eq":
          return eq(column, filter.value)
        case "ne":
          return ne(column, filter.value)
        case "lt":
          return lt(column, filter.value)
        case "lte":
          return lte(column, filter.value)
        case "gt":
          return gt(column, filter.value)
        case "gte":
          return gte(column, filter.value)
        case "ilike":
          return ilike(column, `%${filter.value}%`)
        case "notIlike":
          return notIlike(column, `%${filter.value}%`)
        case "isEmpty":
          return isNull(column)
        case "isNotEmpty":
          return isNotNull(column)
        case "inArray":
          return inArray(
            column,
            Array.isArray(filter.value) ? filter.value : [filter.value],
          )
        case "notInArray":
          return notInArray(
            column,
            Array.isArray(filter.value) ? filter.value : [filter.value],
          )
        case "between": {
          const [from, to] = Array.isArray(filter.value) ? filter.value : []
          if (from === undefined || to === undefined) return undefined
          return between(column, from, to)
        }
        default:
          return undefined
      }
    })
    .filter(Boolean) as SQL[]

  if (conditions.length === 0) return undefined

  return joinOperator === "or" ? or(...conditions) : and(...conditions)
}
