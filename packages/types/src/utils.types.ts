import type { BuildQueryResult, DBQueryConfig } from '@portofolio/db'
import type * as relationsNs from '@portofolio/db/relations/index'

export type StringWithAutocompleteOptions<TOptions> = (string & {}) | TOptions

type TablesWithRelations = typeof relationsNs.relations

// eslint-disable-next-line @typescript-eslint/naming-convention
type QueryConfig<TableName extends keyof TablesWithRelations> = DBQueryConfig<
  'one' | 'many',
  TablesWithRelations,
  TablesWithRelations[TableName]
>

export type InferQueryModel<
  // eslint-disable-next-line @typescript-eslint/naming-convention
  TableName extends keyof TablesWithRelations,
  // eslint-disable-next-line @typescript-eslint/naming-convention
  QBConfig extends true | QueryConfig<TableName> = true,
> = BuildQueryResult<
  TablesWithRelations,
  TablesWithRelations[TableName],
  QBConfig extends true ? true : QBConfig & Record<string, unknown>
>
