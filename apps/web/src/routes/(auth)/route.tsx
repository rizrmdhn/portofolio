import { authMeQueryOptions } from "@/utils/auth-query";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)")({
  beforeLoad: async ({ context }) => {
    // Attempt to fetch user data
    const user =
      await context.queryClient.ensureQueryData(authMeQueryOptions());

    if (user) {
      throw redirect({ to: "/dashboard" });
    }

    return null;
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <Outlet />;
}
