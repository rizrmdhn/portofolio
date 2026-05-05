import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(core)/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(core)/dashboard"!</div>
}
