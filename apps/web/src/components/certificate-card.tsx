import type {Certification} from "@portofolio/types/certification.types";
import { IconExternalLink } from "@tabler/icons-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

interface CertificateCardProps {
  certificate: Certification;
}

export function CertificateCard({ certificate }: CertificateCardProps) {
  return (
    <Card className="flex flex-col rounded-lg p-5 max-w-md">
      <CardContent className="flex flex-col gap-2 p-0">
        <h3 className="text-sm font-semibold leading-[1.3] text-foreground">
          {certificate.title}
        </h3>
        <p className="text-xs text-muted-foreground">{certificate.issuer}</p>
        {certificate.certificateUrl && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open(certificate.certificateUrl!, "_blank")}
            className="py-3 justify-start"
          >
            <span className="flex items-center gap-2 text-[11px] font-mono text-subtle">
              <IconExternalLink className="size-3 shrink-0" />
              View Certificate
            </span>
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
