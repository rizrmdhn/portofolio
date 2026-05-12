import { getQueryClient } from "@/utils/trpc";
import {
  
  
  useMutation
} from "@tanstack/react-query";
import type {QueryKey, UseMutationOptions} from "@tanstack/react-query";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** Extract the item type from a paginated response { data: T[], pageCount } */
type PaginatedData<T> = { data: Array<T>; pageCount: number };

/** Check if a type looks like our paginated shape */
function isPaginated(value: unknown): value is PaginatedData<unknown> {
  return (
    typeof value === "object" &&
    value !== null &&
    "data" in value &&
    Array.isArray((value as PaginatedData<unknown>).data) &&
    "pageCount" in value
  );
}

/** Infer the item type from a query's cached data */
type InferItem<TQueryData> =
  TQueryData extends PaginatedData<infer TItem>
    ? TItem
    : TQueryData extends Array<infer TItem>
      ? TItem
      : TQueryData;

// ---------------------------------------------------------------------------
// Optimistic operation configs
// ---------------------------------------------------------------------------

interface DeleteConfig<TInput> {
  type: "delete";
  /** Extract the id of the item to permanently remove from the mutation input */
  getId: (input: TInput) => string;
}

interface SoftDeleteConfig<TInput> {
  type: "soft-delete";
  /** Extract the id of the item to soft-delete from the mutation input */
  getId: (input: TInput) => string;
}

interface UpdateConfig<TInput, TItem> {
  type: "update";
  /** Extract the id of the item to update from the mutation input */
  getId: (input: TInput) => string;
  /** Return the fields to merge into the existing item */
  getUpdatedFields: (input: TInput) => Partial<TItem>;
}

interface CreateConfig<TInput, TItem> {
  type: "create";
  /** Build a full optimistic item from the mutation input */
  getOptimisticItem: (input: TInput) => TItem;
}

interface ReorderConfig<TInput> {
  type: "reorder";
  /** Extract the reorder map from the mutation input */
  getOrder: (input: TInput) => Array<{ id: string; order: number }>;
}

type OptimisticOperation<TInput, TItem> =
  | DeleteConfig<TInput>
  | SoftDeleteConfig<TInput>
  | UpdateConfig<TInput, TItem>
  | CreateConfig<TInput, TItem>
  | ReorderConfig<TInput>;

// ---------------------------------------------------------------------------
// Hook options
// ---------------------------------------------------------------------------

interface UseOptimisticMutationOptions<
  TMutationData,
  TError,
  TInput,
  TQueryData,
> {
  /** The query whose cache will be optimistically updated */
  queryOptions: { queryKey: QueryKey };
  /** What kind of optimistic change to apply */
  operation: OptimisticOperation<TInput, InferItem<TQueryData>>;
  /** Called after the server confirms success (after optimistic) */
  onSuccess?: (data: TMutationData) => Promise<void> | void;
  /** Called when the mutation fails (after rollback) */
  onError?: (error: TError) => Promise<void> | void;
  /** Called after either success or error */
  onSettled?: () => void | Promise<void>;
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

/**
 * Type-safe optimistic mutation hook.
 *
 * Wraps `useMutation` and automatically:
 * 1. Cancels outgoing refetches for the target query
 * 2. Snapshots current cache data
 * 3. Applies the optimistic update (create / update / delete)
 * 4. Rolls back on error
 * 5. Invalidates the query on settle to refetch fresh data
 *
 * Works with both paginated `{ data: T[], pageCount }` and plain `T[]` caches.
 *
 * @example
 * ```ts
 * const deleteMut = useOptimisticMutation(
 *   trpc.pengujian.chemicalMaterial.delete.mutationOptions(),
 *   {
 *     queryOptions: trpc.pengujian.chemicalMaterial.getPaginated.queryOptions(params),
 *     operation: { type: "delete", getId: (input) => input.id },
 *     onSuccess: () => globalSuccessToast("Deleted"),
 *   },
 * );
 * ```
 */
export function useOptimisticMutation<
  TMutationData,
  TError extends Error,
  TInput,
  TQueryData,
>(
  mutationOpts: Pick<
    UseMutationOptions<TMutationData, TError, TInput>,
    "mutationFn" | "mutationKey"
  >,
  {
    queryOptions,
    operation,
    onSuccess,
    onError,
    onSettled,
  }: UseOptimisticMutationOptions<TMutationData, TError, TInput, TQueryData>,
) {
  const queryClient = getQueryClient();

  const { queryKey } = queryOptions;

  return useMutation<TMutationData, TError, TInput, { previous: TQueryData }>({
    ...mutationOpts,

    async onMutate(input: TInput) {
      // 1. Cancel any outgoing refetches so they don't overwrite our optimistic update
      await queryClient.cancelQueries({ queryKey });

      // 2. Snapshot the current value
      const previous = queryClient.getQueryData<TQueryData>(queryKey);

      // 3. Optimistically update the cache
      if (previous !== undefined) {
        queryClient.setQueryData<TQueryData>(queryKey, (old) => {
          if (old === undefined) return old;
          return applyOptimisticUpdate(old, input, operation);
        });
      }

      return { previous: previous as TQueryData };
    },

    async onError(error, _input, context) {
      // 4. Roll back to the snapshot
      if (context?.previous !== undefined) {
        queryClient.setQueryData<TQueryData>(queryKey, context.previous);
      }
      await onError?.(error);
    },

    async onSuccess(data) {
      await onSuccess?.(data);
    },

    async onSettled() {
      // 5. Always refetch to make sure we're in sync with server
      await queryClient.invalidateQueries({ queryKey });
      await onSettled?.();
    },
  });
}

// ---------------------------------------------------------------------------
// Cache update logic
// ---------------------------------------------------------------------------

function applyOptimisticUpdate<TQueryData, TInput>(
  old: TQueryData,
  input: TInput,
  operation: OptimisticOperation<TInput, InferItem<TQueryData>>,
): TQueryData {
  // Paginated shape
  if (isPaginated(old)) {
    const items = old.data as Array<InferItem<TQueryData>>;
    const updated = applyToArray(items, input, operation);
    return { ...old, data: updated };
  }

  // Plain array shape
  if (Array.isArray(old)) {
    return applyToArray(
      old as Array<InferItem<TQueryData>>,
      input,
      operation,
    ) as TQueryData;
  }

  // Single item shape (only update makes sense here)
  if (operation.type === "update") {
    const fields = operation.getUpdatedFields(input);
    return { ...old, ...fields };
  }

  return old;
}

function applyToArray<TItem, TInput>(
  items: Array<TItem>,
  input: TInput,
  operation: OptimisticOperation<TInput, TItem>,
): Array<TItem> {
  switch (operation.type) {
    case "delete":
      return items.filter(
        (item) =>
          (item as Record<string, unknown>).id !== operation.getId(input),
      );

    case "soft-delete":
      return items.map((item) =>
        (item as Record<string, unknown>).id === operation.getId(input)
          ? { ...item, deletedAt: new Date().toISOString() }
          : item,
      );

    case "update":
      return items.map((item) =>
        (item as Record<string, unknown>).id === operation.getId(input)
          ? { ...item, ...operation.getUpdatedFields(input) }
          : item,
      );

    case "create":
      return [...items, operation.getOptimisticItem(input)];

    case "reorder": {
      const orderMap = new Map(
        operation.getOrder(input).map(({ id, order }) => [id, order]),
      );
      return [...items].sort((a, b) => {
        const aOrder = orderMap.get((a as Record<string, unknown>).id as string) ?? 0;
        const bOrder = orderMap.get((b as Record<string, unknown>).id as string) ?? 0;
        return aOrder - bOrder;
      });
    }
  }
}
