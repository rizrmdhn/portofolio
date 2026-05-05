import { authMeQueryOptions } from "@/utils/auth-query";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(core)")({
  beforeLoad: async ({ context }) => {
    try {
      // Attempt to fetch user data
      const user =
        await context.queryClient.ensureQueryData(authMeQueryOptions());

      if (!user) {
        throw redirect({ to: "/login" });
      }

      return null;
    } catch (error) {
      // If it's already a redirect, re-throw it
      if (error && typeof error === "object" && "isRedirect" in error) {
        throw error;
      }

      // If auth.me fails (even after token refresh attempt), redirect to login
      throw redirect({ to: "/login" });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/(core)"!</div>;
}
