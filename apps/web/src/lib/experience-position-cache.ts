import type { AppRouter } from '@portofolio/api/root'
import type { QueryClient } from '@tanstack/react-query'
import type { TRPCOptionsProxy } from '@trpc/tanstack-react-query'

export async function invalidatePositionQueries(
  queryClient: QueryClient,
  api: TRPCOptionsProxy<AppRouter>,
  sourceId: string,
) {
  await Promise.all([
    queryClient.invalidateQueries(api.experience.getForDashboard.queryFilter()),
    queryClient.invalidateQueries(api.experience.getById.queryFilter({ id: sourceId })),
    queryClient.invalidateQueries(api.experience.getGroups.queryFilter()),
    queryClient.invalidateQueries(api.experience.getAll.queryFilter()),
  ])
}
