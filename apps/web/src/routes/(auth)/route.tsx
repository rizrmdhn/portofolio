import { getUser } from "@/functions/get-user";
import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)")({
  beforeLoad: async () => {
    const session = await getUser();
    return { session };
  },
  loader: async ({ context }) => {
    if (context.session) {
      throw redirect({
        to: "/dashboard",
      });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <Outlet />;
}
