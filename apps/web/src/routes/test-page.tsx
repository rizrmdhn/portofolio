import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/test-page')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello test-page</div>
}
