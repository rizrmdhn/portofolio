import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useLocale, useTranslations } from '@/i18n/locale-context'
import { LOCALES, LOCALE_LABELS, LOCALE_SHORT_LABELS } from '@portofolio/i18n'
import { IconCheck, IconLanguage } from '@tabler/icons-react'
import { useNavigate } from '@tanstack/react-router'
import { Button } from './ui/button'

/**
 * Switches the active locale by replacing only the `$locale` path param on the
 * current route — staying on the same page (slug, search, and hash preserved).
 */
export function LanguageSwitcher() {
  const navigate = useNavigate()
  const locale = useLocale()
  const { t } = useTranslations()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" size="lg" />}>
        <span className="text-subtle flex items-center gap-1.5 font-mono text-sm">
          <IconLanguage className="size-4" />
          {LOCALE_SHORT_LABELS[locale]}
        </span>
        <span className="sr-only">{t.nav.language}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {LOCALES.map((l) => (
          <DropdownMenuItem
            key={l}
            onClick={() =>
              navigate({
                to: '.',
                params: (prev) => ({ ...prev, locale: l }),
                search: (prev) => prev,
              })
            }
          >
            <IconCheck className={l === locale ? 'mr-2 size-4' : 'mr-2 size-4 opacity-0'} />
            {LOCALE_LABELS[l]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
