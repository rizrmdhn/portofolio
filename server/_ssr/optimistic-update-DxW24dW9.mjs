import { t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as getQueryClient } from "./trpc-DhZOnnjr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/optimistic-update-DxW24dW9.js
/** Check if a type looks like our paginated shape */
function isPaginated(value) {
	return typeof value === "object" && value !== null && "data" in value && Array.isArray(value.data) && "pageCount" in value;
}
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
function useOptimisticMutation(mutationOpts, { queryOptions, operation, onSuccess, onError, onSettled }) {
	const queryClient = getQueryClient();
	const { queryKey } = queryOptions;
	return useMutation({
		...mutationOpts,
		async onMutate(input) {
			await queryClient.cancelQueries({ queryKey });
			const previous = queryClient.getQueryData(queryKey);
			if (previous !== void 0) queryClient.setQueryData(queryKey, (old) => {
				if (old === void 0) return old;
				return applyOptimisticUpdate(old, input, operation);
			});
			return { previous };
		},
		async onError(error, _input, context) {
			if (context?.previous !== void 0) queryClient.setQueryData(queryKey, context.previous);
			await onError?.(error);
		},
		async onSuccess(data) {
			await onSuccess?.(data);
		},
		async onSettled() {
			await queryClient.invalidateQueries({ queryKey });
			await onSettled?.();
		}
	});
}
function applyOptimisticUpdate(old, input, operation) {
	if (isPaginated(old)) {
		const items = old.data;
		const updated = applyToArray(items, input, operation);
		return {
			...old,
			data: updated
		};
	}
	if (Array.isArray(old)) return applyToArray(old, input, operation);
	if (operation.type === "update") {
		const fields = operation.getUpdatedFields(input);
		return {
			...old,
			...fields
		};
	}
	return old;
}
function applyToArray(items, input, operation) {
	switch (operation.type) {
		case "delete": return items.filter((item) => item.id !== operation.getId(input));
		case "soft-delete": return items.map((item) => item.id === operation.getId(input) ? {
			...item,
			deletedAt: (/* @__PURE__ */ new Date()).toISOString()
		} : item);
		case "update": return items.map((item) => item.id === operation.getId(input) ? {
			...item,
			...operation.getUpdatedFields(input)
		} : item);
		case "create": return [...items, operation.getOptimisticItem(input)];
		case "reorder": {
			const orderMap = new Map(operation.getOrder(input).map(({ id, order }) => [id, order]));
			return [...items].sort((a, b) => {
				return (orderMap.get(a.id) ?? 0) - (orderMap.get(b.id) ?? 0);
			});
		}
	}
}
//#endregion
export { useOptimisticMutation as t };
