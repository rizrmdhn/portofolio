import type { BuildQueryResult, DBQueryConfig } from "@portofolio/db";
import type * as relationsNs from "@portofolio/db/relations/index";

export type StringWithAutocompleteOptions<TOptions> = (string & {}) | TOptions;

type TablesWithRelations = typeof relationsNs.relations;

type QueryConfig<TableName extends keyof TablesWithRelations> = DBQueryConfig<
  "one" | "many",
  TablesWithRelations,
  TablesWithRelations[TableName]
>;

export type InferQueryModel<
  TableName extends keyof TablesWithRelations,
  QBConfig extends true | QueryConfig<TableName> = true,
> = BuildQueryResult<
  TablesWithRelations,
  TablesWithRelations[TableName],
  QBConfig extends true ? true : QBConfig & Record<string, unknown>
>;
