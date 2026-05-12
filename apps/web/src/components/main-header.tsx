import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { IconMenu2 } from '@tabler/icons-react'
import { useNavigate } from '@tanstack/react-router'
import { LoginButton } from './login-button'
import { ModeToggle } from './mode-toggle'
import { Button } from './ui/button'

const navigationItems = ['About', 'Experience', 'Projects', 'Stack', 'Certs', 'Contact'] as const

export function MainHeader() {
  const navigate = useNavigate()

  return (
    <div className="border-border bg-nav sticky top-0 z-50 flex h-14 items-center justify-between border-b px-6 backdrop-blur-sm">
      <Button
        className="text-subtle font-mono text-base"
        variant="link"
        size="lg"
        onClick={() => navigate({ to: '/' })}
      >
        rizrmdhn.com
      </Button>

      {/* Desktop nav */}
      <nav className="hidden space-x-4 md:flex">
        {navigationItems.map((item) => (
          <Button
            key={item}
            className="text-subtle text-sm"
            variant="ghost"
            size="lg"
            onClick={() => navigate({ to: '/', hash: item.toLowerCase() })}
          >
            {item}
          </Button>
        ))}
      </nav>

      {/* Desktop right controls */}
      <div className="hidden items-center gap-2 md:flex">
        <ModeToggle type="color" />
        <Button variant="outline" size="lg" onClick={() => navigate({ to: '/resume' })}>
          <p className="text-subtle font-mono text-sm">Resume ↗</p>
        </Button>
        <LoginButton />
      </div>

      {/* Mobile hamburger */}
      <Sheet>
        <SheetTrigger render={<Button variant="ghost" size="icon" className="md:hidden" />}>
          <IconMenu2 className="text-subtle size-5" />
          <span className="sr-only">Open menu</span>
        </SheetTrigger>
        <SheetContent side="right">
          <SheetHeader className="border-border border-b pb-4">
            <SheetTitle className="text-subtle font-mono text-base">Menu</SheetTitle>
          </SheetHeader>
          <nav className="flex flex-col gap-1 p-4">
            {navigationItems.map((item) => (
              <SheetClose
                key={item}
                render={
                  <Button
                    variant="ghost"
                    className="text-subtle w-full justify-start text-sm"
                    onClick={() => navigate({ to: '/', hash: item.toLowerCase() })}
                  />
                }
              >
                {item}
              </SheetClose>
            ))}
          </nav>
          <SheetFooter className="border-border flex flex-col gap-3 border-t px-4 pt-4">
            <div className="flex items-center justify-between">
              <span className="text-subtle font-mono text-xs">Theme</span>
              <ModeToggle type="color" />
            </div>
            <LoginButton />
            <Button
              variant="outline"
              size="lg"
              className="w-full"
              onClick={() => window.open('/resume.pdf', '_blank')}
            >
              <p className="text-subtle font-mono text-sm">Resume ↗</p>
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  )
}
