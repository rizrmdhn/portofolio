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
    <div className="h-14 flex items-center justify-between border-border border-b px-6">
      <Button
        className="text-base font-mono text-subtle"
        variant="link"
        size="lg"
        onClick={() => navigate({ to: "/" })}
      >
        rizrmdhn.com
      </Button>

      <nav className="flex space-x-4">
        {navigationItems.map((item) => (
          <Button
            key={item}
            className="text-sm text-subtle"
            variant="ghost"
            size="lg"
            onClick={() => navigate({ to: `#${item.toLowerCase()}` })}
          >
            {item}
          </Button>
        ))}
      </nav>

      <div className="flex items-center gap-4">
        <ModeToggle />

        {/* Resume Button */}
        <Button
          variant="outline"
          size="lg"
          onClick={() => window.open("/resume.pdf", "_blank")}
        >
          <p className="text-sm font-mono text-subtle">Resume ↗</p>
        </Button>

        <LoginButton />
      </div>
    </div>
  );
}
