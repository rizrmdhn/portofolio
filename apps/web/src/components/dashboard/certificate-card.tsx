import { cn } from "@/lib/utils";
import type {Certification} from "@portofolio/types/certification.types";
import {
  IconAward,
  IconExternalLink,
  IconGripVertical,
  IconPencil,
} from "@tabler/icons-react";
import { useNavigate } from "@tanstack/react-router";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button, buttonVariants } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Separator } from "../ui/separator";

interface CertificateCardProps {
  certificate: Certification;
  dragHandleProps?: React.HTMLAttributes<HTMLButtonElement>;
}

export function CertificateCard({
  certificate,
  dragHandleProps,
}: CertificateCardProps) {
  const navigate = useNavigate();

  return (
    <Card className="py-3 px-4">
      <CardContent className="flex items-center gap-3 px-0">
        {/* Main content */}
        <div className="flex flex-1 flex-col gap-2 min-w-0">
          <div className="flex items-center gap-2 flex-row">
            {/* Drag handle */}
            <button
              className="flex items-center text-muted-foreground/40 cursor-grab active:cursor-grabbing hover:text-muted-foreground"
              {...dragHandleProps}
            >
              <IconGripVertical className="size-4 shrink-0" />
            </button>

            {/* Avatar */}
            <Avatar className="size-9 rounded-md shrink-0 after:rounded-md">
              <AvatarFallback className="rounded-md text-xs font-semibold">
                <IconAward className="size-4" />
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-semibold leading-tight truncate text-foreground">
              {certificate.title}
            </span>
            <span className="text-xs text-muted-foreground">
              {certificate.issuer}
            </span>
          </div>
        </div>
      </CardContent>
      <Separator />
      <CardFooter className="flex items-center justify-start p-0 gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            navigate({
              to: "/dashboard/certificate/$certificateId/edit",
              params: { certificateId: certificate.id },
            })
          }
        >
          <IconPencil className="size-3.5" />
          Edit
        </Button>
        {certificate.certificateUrl && (
          <a
            href={certificate.certificateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
          >
            <IconExternalLink className="size-3.5" />
            View
          </a>
        )}
      </CardFooter>
    </Card>
  );
}
