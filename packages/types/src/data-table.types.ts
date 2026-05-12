export type JoinOperator = "and" | "or"

export type FilterOperator =
  | "eq"
  | "ne"
  | "lt"
  | "lte"
  | "gt"
  | "gte"
  | "ilike"
  | "notIlike"
  | "isEmpty"
  | "isNotEmpty"
  | "inArray"
  | "notInArray"
  | "between"

export type FilterVariant =
  | "text"
  | "number"
  | "date"
  | "select"
  | "multiSelect"
  | "boolean"

export interface ExtendedColumnFilter<
  TData extends Record<string, unknown> = Record<string, unknown>,
> {
  id: keyof TData & string
  value: string | Array<string>
  operator: FilterOperator
  variant: FilterVariant
  filterId: string
}

export type ExtendedColumnSort<
  TData extends Record<string, unknown> = Record<string, unknown>,
> = {
  id: keyof TData & string
  desc: boolean
}
