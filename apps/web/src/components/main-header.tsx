import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { useLocale, useTranslations } from '@/i18n/locale-context'
import { IconMenu2 } from '@tabler/icons-react'
import { useNavigate } from '@tanstack/react-router'
import { LanguageSwitcher } from './language-switcher'
import { LoginButton } from './login-button'
import { ModeToggle } from './mode-toggle'
import { Button } from './ui/button'

export function MainHeader() {
  const navigate = useNavigate()
  const locale = useLocale()
  const { t } = useTranslations()

  // `id` is the stable scroll-target anchor (section element id); `label` is the
  // translated text. Keeping them separate means translating the label never
  // breaks the in-page hash navigation.
  const navigationItems = [
    { id: 'about', label: t.nav.about },
    { id: 'experience', label: t.nav.experience },
    { id: 'projects', label: t.nav.projects },
    { id: 'stack', label: t.nav.stack },
    { id: 'certs', label: t.nav.certs },
    { id: 'contact', label: t.nav.contact },
  ]

  return (
    <div className="border-border bg-nav sticky top-0 z-50 flex h-14 items-center justify-between border-b px-6 backdrop-blur-sm">
      <Button
        className="text-subtle font-mono text-base"
        variant="link"
        size="lg"
        onClick={() => navigate({ to: '/$locale', params: { locale } })}
      >
        rizrmdhn.com
      </Button>

      {/* Desktop nav */}
      <nav className="hidden space-x-4 md:flex">
        {navigationItems.map((item) => (
          <Button
            key={item.id}
            className="text-subtle text-sm"
            variant="ghost"
            size="lg"
            onClick={() => navigate({ to: '/$locale', params: { locale }, hash: item.id })}
          >
            {item.label}
          </Button>
        ))}
      </nav>

      {/* Desktop right controls */}
      <div className="hidden items-center gap-2 md:flex">
        <ModeToggle type="color" />
        <LanguageSwitcher />
        <Button
          variant="outline"
          size="lg"
          onClick={() => navigate({ to: '/$locale/resume', params: { locale } })}
        >
          <p className="text-subtle font-mono text-sm">{t.nav.resume}</p>
        </Button>
        <LoginButton />
      </div>

      {/* Mobile hamburger */}
      <Sheet>
        <SheetTrigger render={<Button variant="ghost" size="icon" className="md:hidden" />}>
          <IconMenu2 className="text-subtle size-5" />
          <span className="sr-only">{t.nav.openMenu}</span>
        </SheetTrigger>
        <SheetContent id="main-nav-mobile" side="right">
          <SheetHeader className="border-border border-b pb-4">
            <SheetTitle className="text-subtle font-mono text-base">{t.nav.menu}</SheetTitle>
          </SheetHeader>
          <nav className="flex flex-col gap-1 p-4">
            {navigationItems.map((item) => (
              <SheetClose
                key={item.id}
                render={
                  <Button
                    variant="ghost"
                    className="text-subtle w-full justify-start text-sm"
                    onClick={() => navigate({ to: '/$locale', params: { locale }, hash: item.id })}
                  />
                }
              >
                {item.label}
              </SheetClose>
            ))}
          </nav>
          <SheetFooter className="border-border flex flex-col gap-3 border-t px-4 pt-4">
            <div className="flex items-center justify-between">
              <span className="text-subtle font-mono text-xs">{t.nav.theme}</span>
              <ModeToggle type="color" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-subtle font-mono text-xs">{t.nav.language}</span>
              <LanguageSwitcher />
            </div>
            <Button
              variant="outline"
              size="lg"
              className="w-full"
              onClick={() => navigate({ to: '/$locale/resume', params: { locale } })}
            >
              <p className="text-subtle font-mono text-sm">{t.nav.resume}</p>
            </Button>
            <LoginButton />
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  )
}
