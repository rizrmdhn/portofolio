import type { InferSelectModel, SQL, Table } from '@portofolio/db'
import { and, asc, count, desc, gte, lte } from '@portofolio/db'
import { db } from '@portofolio/db/client'
import type { FilterSchema } from '@portofolio/schema/filter.schema'
import type { JoinOperator } from '@portofolio/types/data-table.types'
import { QueryError } from '../errors'
import { filterColumns } from './filter-columns'

interface JoinConfig {
  type: 'left' | 'inner' | 'right'
  table: Table
  on: SQL
}

interface PaginatedInput {
  page: number
  perPage: number
  sort: Array<{ id: string; desc: boolean }>
  filters: Array<FilterSchema>
  joinOperator: JoinOperator
  createdAt: Array<number>
}

interface GetOffsetPaginatedOptions<T extends Table, TResult = InferSelectModel<T>> {
  table: T
  input: PaginatedInput
  searchConditions?: Array<SQL | undefined>
  /** Custom select shape — defaults to all columns of the primary table */
  select?: Record<string, unknown>
  /** Joins applied to both the data and count queries */
  joins?: Array<JoinConfig>
  /** Type parameter only — used to infer TResult, never passed at runtime */
  _result?: TResult
}

function applyJoins(query: any, joins: Array<JoinConfig>): any {
  for (const join of joins) {
    if (join.type === 'left') query = query.leftJoin(join.table, join.on)
    else if (join.type === 'inner') query = query.innerJoin(join.table, join.on)
    else query = query.rightJoin(join.table, join.on)
  }
  return query
}

export async function getOffsetPaginated<T extends Table, TResult = InferSelectModel<T>>({
  table,
  input,
  searchConditions,
  select,
  joins = [],
}: GetOffsetPaginatedOptions<T, TResult>): Promise<{ data: Array<TResult>; pageCount: number }> {
  const offset = (input.page - 1) * input.perPage
  const advancedFilter = input.filters.length > 0

  const where = advancedFilter
    ? filterColumns({
        table,
        filters: input.filters,
        joinOperator: input.joinOperator,
      })
    : and(
        ...(searchConditions ?? []),
        input.createdAt.length > 0
          ? and(
              input.createdAt[0]
                ? gte(
                    (table as Record<string, unknown>)['createdAt'] as SQL,
                    (() => {
                      const date = new Date(input.createdAt[0])
                      date.setHours(0, 0, 0, 0)
                      return date.toISOString()
                    })(),
                  )
                : undefined,
              input.createdAt[1]
                ? lte(
                    (table as Record<string, unknown>)['createdAt'] as SQL,
                    (() => {
                      const date = new Date(input.createdAt[1])
                      date.setHours(23, 59, 59, 999)
                      return date.toISOString()
                    })(),
                  )
                : undefined,
            )
          : undefined,
      )

  const orderBy =
    input.sort.length > 0
      ? input.sort.map((item) =>
          item.desc
            ? desc((table as Record<string, unknown>)[item.id] as SQL)
            : asc((table as Record<string, unknown>)[item.id] as SQL),
        )
      : [desc((table as Record<string, unknown>)['createdAt'] as SQL)]

  const { data, total } = await db
    .transaction(async (tx) => {
      // @ts-expect-error - Drizzle's .from() conditional type doesn't resolve with generics
      const baseDataQuery = select ? tx.select(select).from(table) : tx.select().from(table)
      const resData = (await applyJoins(baseDataQuery, joins)
        .limit(input.perPage)
        .offset(offset)
        .where(where)
        .orderBy(...orderBy)) as Array<TResult>

      // @ts-expect-error - Drizzle's .from() conditional type doesn't resolve with generics
      const baseCountQuery = tx.select({ count: count() }).from(table)
      const resTotal = await applyJoins(baseCountQuery, joins)
        .where(where)
        .execute()
        .then((res: Array<{ count: number }>) => res[0]?.count ?? 0)

      return { data: resData, total: resTotal }
    })
    .catch((error) => {
      throw new QueryError('Failed to fetch paginated data', error)
    })

  return {
    data,
    pageCount: Math.ceil(total / input.perPage),
  }
}
