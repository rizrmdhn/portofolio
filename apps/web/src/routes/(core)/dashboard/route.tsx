import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { getUser } from "@/functions/get-user";
import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(core)/dashboard")({
  beforeLoad: async () => {
    const session = await getUser();

    if (!session) {
      throw redirect({
        to: "/login",
      });
    }

    return { session };
  },
  loader: async ({ context }) => {
    return context.session;
  },
  component: CoreLayout,
});

function CoreLayout() {
  const { user } = Route.useLoaderData();

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="sidebar" user={user} />
      <SidebarInset className="overflow-hidden contain-inline-size">
        <SiteHeader />
        <div className="overflow-y-auto p-4">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
