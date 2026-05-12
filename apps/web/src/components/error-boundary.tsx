import { EmptyState } from "@/components/ui/empty-state";
import { useRouter } from "@tanstack/react-router";
import type { ErrorComponentProps } from "@tanstack/react-router";
import { IconAlertTriangle, IconRefresh } from "@tabler/icons-react";

export function ErrorBoundary({ error }: ErrorComponentProps) {
  const router = useRouter();
  const message =
    error instanceof Error ? error.message : "An unexpected error occurred.";

  return (
    <div className="flex h-svh items-center justify-center p-6">
      <EmptyState
        icon={IconAlertTriangle}
        title="Something went wrong"
        description={message}
        actions={[
          {
            label: "Try again",
            icon: IconRefresh,
            onClick: () => router.invalidate(),
          },
          {
            label: "Go home",
            href: "/",
            variant: "outline",
          },
        ]}
      />
    </div>
  );
}
