import { useTranslations } from '@/i18n/locale-context'
import type { Certification } from '@portofolio/types/certification.types'
import { IconExternalLink } from '@tabler/icons-react'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'

interface CertificateCardProps {
  certificate: Certification
}

export function CertificateCard({ certificate }: CertificateCardProps) {
  const { t } = useTranslations()

  return (
    <Card className="flex max-w-md flex-col rounded-lg p-5">
      <CardContent className="flex flex-col gap-2 p-0">
        <h3 className="text-foreground text-sm leading-[1.3] font-semibold">{certificate.title}</h3>
        <p className="text-muted-foreground text-xs">{certificate.issuer}</p>
        {certificate.certificateUrl && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open(certificate.certificateUrl!, '_blank')}
            className="justify-start py-3"
          >
            <span className="text-subtle flex items-center gap-2 font-mono text-[11px]">
              <IconExternalLink className="size-3 shrink-0" />
              {t.certificateCard.viewCertificate}
            </span>
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
