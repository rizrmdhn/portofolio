import assert from 'node:assert/strict'
import { test } from 'node:test'
import { QueryClient } from '@tanstack/react-query'
import { createTRPCOptionsProxy } from '@trpc/tanstack-react-query'
import type { AppRouter } from '@portofolio/api/root'
import { invalidatePositionQueries } from './experience-position-cache'

test('adding a position invalidates source, groups, all dashboard searches and public locales', async () => {
  const queryClient = new QueryClient()
  // Router types and query-key generation only. No transport, server context or database.
  const api = createTRPCOptionsProxy<AppRouter>({ queryClient, client: {} as never })
  const keys = [
    api.experience.getForDashboard.queryKey({}),
    api.experience.getForDashboard.queryKey({ search: 'Engineer' }),
    api.experience.getById.queryKey({ id: 'source' }),
    api.experience.getGroups.queryKey(),
    api.experience.getAll.queryKey({ locale: 'en' }),
    api.experience.getAll.queryKey({ locale: 'id' }),
  ]
  const untouched = api.experience.getById.queryKey({ id: 'unrelated' })
  for (const key of [...keys, untouched]) queryClient.setQueryData(key, [])
  await invalidatePositionQueries(queryClient, api, 'source')
  for (const key of keys) assert.equal(queryClient.getQueryState(key)?.isInvalidated, true)
  assert.equal(queryClient.getQueryState(untouched)?.isInvalidated, false)
  queryClient.clear()
})
