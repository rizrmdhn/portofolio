import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useLocation } from "@tanstack/react-router";
import { useMemo } from "react";

function formatSegment(segment: string): string {
  // Capitalize and format the segment (e.g., "user-roles" -> "User Roles")
  return segment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function getPageTitle(pathname: string): string {
  // Remove trailing slash and get path segments
  const cleanPath = pathname.replace(/\/$/, "") || "/";
  const segments = cleanPath.split("/").filter(Boolean);

  // Root path
  if (segments.length === 0) {
    return "Home";
  }

  // Get the last meaningful segment
  const lastSegment = segments[segments.length - 1];
  if (!lastSegment) {
    return "Home";
  }

  // Action words for routes
  const actionWords = [
    "create",
    "edit",
    "new",
    "add",
    "update",
    "delete",
    "detail",
  ];

  // Check if last segment is an action word (e.g., /users/$userId/edit)
  if (segments.length > 2 && actionWords.includes(lastSegment.toLowerCase())) {
    // Find the parent segment (skip the ID)
    const secondLast = segments[segments.length - 2];
    if (!secondLast) return formatSegment(lastSegment);

    const isSecondLastId = /^[0-9a-f-]{36}$|^\d+$/.test(secondLast);

    if (isSecondLastId) {
      // Pattern: /users/$userId/edit -> "User Edit"
      const parentSegment = segments[segments.length - 3];
      if (!parentSegment) return formatSegment(lastSegment);

      const singular = parentSegment.endsWith("s")
        ? parentSegment.slice(0, -1)
        : parentSegment;
      return `${formatSegment(singular)} ${formatSegment(lastSegment)}`;
    } else {
      // Pattern: /users/create -> "Users Create"
      return `${formatSegment(secondLast)} ${formatSegment(lastSegment)}`;
    }
  }

  // Check if it's a UUID or numeric ID (skip it and use previous segment)
  const isId = /^[0-9a-f-]{36}$|^\d+$/.test(lastSegment);

  if (isId && segments.length > 1) {
    // Use the previous segment with "Detail" suffix
    const parentSegment = segments[segments.length - 2];
    if (!parentSegment) return "Detail";

    // Singularize if ends with 's' (simple approach)
    const singular = parentSegment.endsWith("s")
      ? parentSegment.slice(0, -1)
      : parentSegment;
    return `${formatSegment(singular)} Detail`;
  }

  return formatSegment(lastSegment);
}

export function SiteHeader() {
  const location = useLocation();

  const pageTitle = useMemo(
    () => getPageTitle(location.pathname),
    [location.pathname],
  );

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" size="icon-lg" />
        <Separator orientation="vertical" className="mx-2 " />
        <h1 className="text-base font-medium">{pageTitle}</h1>
      </div>
    </header>
  );
}
