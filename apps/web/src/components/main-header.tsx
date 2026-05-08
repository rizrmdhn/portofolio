import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { IconMenu2 } from "@tabler/icons-react";
import { useNavigate } from "@tanstack/react-router";
import { LoginButton } from "./login-button";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";

const navigationItems = [
  "About",
  "Experience",
  "Projects",
  "Stack",
  "Certs",
  "Contact",
] as const;

export function MainHeader() {
  const navigate = useNavigate();

  return (
    <div className="h-14 flex items-center justify-between border-border border-b px-6 sticky top-0 z-50 bg-nav backdrop-blur-sm">
      <Button
        className="text-base font-mono text-subtle"
        variant="link"
        size="lg"
        onClick={() => navigate({ to: "/" })}
      >
        rizrmdhn.com
      </Button>

      {/* Desktop nav */}
      <nav className="hidden md:flex space-x-4">
        {navigationItems.map((item) => (
          <Button
            key={item}
            className="text-sm text-subtle"
            variant="ghost"
            size="lg"
            onClick={() => navigate({ to: "/", hash: item.toLowerCase() })}
          >
            {item}
          </Button>
        ))}
      </nav>

      {/* Desktop right controls */}
      <div className="hidden md:flex items-center gap-4">
        <ModeToggle type="color" />
        <Button
          variant="outline"
          size="lg"
          onClick={() => window.open("/resume.pdf", "_blank")}
        >
          <p className="text-sm font-mono text-subtle">Resume ↗</p>
        </Button>
        <LoginButton />
      </div>

      {/* Mobile hamburger */}
      <Sheet>
        <SheetTrigger
          render={<Button variant="ghost" size="icon" className="md:hidden" />}
        >
          <IconMenu2 className="size-5 text-subtle" />
          <span className="sr-only">Open menu</span>
        </SheetTrigger>
        <SheetContent side="right">
          <SheetHeader className="border-b border-border pb-4">
            <SheetTitle className="text-base text-subtle font-mono">
              Menu
            </SheetTitle>
          </SheetHeader>
          <nav className="flex flex-col gap-1 p-4">
            {navigationItems.map((item) => (
              <SheetClose
                key={item}
                render={
                  <Button
                    variant="ghost"
                    className="justify-start text-sm text-subtle w-full"
                    onClick={() => navigate({ to: "/", hash: item.toLowerCase() })}
                  />
                }
              >
                {item}
              </SheetClose>
            ))}
          </nav>
          <SheetFooter className="flex flex-col gap-3 px-4 pt-4 border-t border-border">
            <div className="flex items-center justify-between">
              <span className="text-xs text-subtle font-mono">Theme</span>
              <ModeToggle type="color" />
            </div>
            <LoginButton />
            <Button
              variant="outline"
              size="lg"
              className="w-full"
              onClick={() => window.open("/resume.pdf", "_blank")}
            >
              <p className="text-sm font-mono text-subtle">Resume ↗</p>
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
