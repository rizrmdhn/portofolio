import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { authMeQueryOptions } from "@/utils/auth-query";

import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(core)/dashboard")({
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
  component: CoreLayout,
});

function CoreLayout() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="sidebar" />
      <SidebarInset className="overflow-hidden contain-inline-size">
        <SiteHeader />
        <div className="overflow-y-auto p-4">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
