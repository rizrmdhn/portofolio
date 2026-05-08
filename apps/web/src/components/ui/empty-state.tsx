import { isValidElement, type ElementType, type ReactNode } from "react";

import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { IconArrowUpRight, type TablerIcon } from "@tabler/icons-react";

export type EmptyStateAction =
  | { render: ReactNode }
  | {
      render?: never;
      label: string;
      icon?: TablerIcon | ReactNode;
      onClick?: () => void;
      href?: string;
      variant?:
        | "default"
        | "outline"
        | "ghost"
        | "link"
        | "destructive"
        | "secondary";
      className?: string;
    };

export interface EmptyStateProps {
  icon?: TablerIcon | ReactNode;
  iconVariant?: "default" | "icon";
  title: string;
  description: string;
  actions?: EmptyStateAction[];
  learnMoreHref?: string;
  learnMoreLabel?: string;
  className?: string;
}

export function EmptyState({
  icon: Icon,
  iconVariant = "icon",
  title,
  description,
  actions = [],
  learnMoreHref,
  learnMoreLabel = "Learn More",
  className,
}: EmptyStateProps) {
  return (
    <Empty className={className}>
      <EmptyHeader>
        {Icon && (
          <EmptyMedia variant={iconVariant}>
            {isValidElement(Icon)
              ? Icon
              : (() => {
                  const I = Icon as ElementType;
                  return <I />;
                })()}
          </EmptyMedia>
        )}
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
      </EmptyHeader>
      {actions.length > 0 && (
        <EmptyContent>
          <div className="flex gap-2">
            {actions.map((action, index) => {
              if (!("label" in action)) {
                return <span key={index}>{action.render}</span>;
              }

              const actionIcon = action.icon
                ? isValidElement(action.icon)
                  ? action.icon
                  : (() => {
                      const I = action.icon as ElementType;
                      return <I />;
                    })()
                : null;

              if (action.href) {
                return (
                  <Button
                    key={index}
                    variant={action.variant || "default"}
                    render={<a href={action.href} />}
                    className={action.className}
                  >
                    {actionIcon}
                    {action.label}
                  </Button>
                );
              }
              return (
                <Button
                  key={index}
                  variant={action.variant || "default"}
                  onClick={action.onClick}
                  className={action.className}
                >
                  {actionIcon}
                  {action.label}
                </Button>
              );
            })}
          </div>
        </EmptyContent>
      )}
      {learnMoreHref && (
        <Button
          variant="link"
          size="sm"
          className="text-muted-foreground"
          render={<a href={learnMoreHref} />}
        >
          {learnMoreLabel} <IconArrowUpRight />
        </Button>
      )}
    </Empty>
  );
}
