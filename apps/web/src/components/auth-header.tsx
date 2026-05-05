import { useNavigate } from "@tanstack/react-router";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";

export function AuthHeader() {
  const navigate = useNavigate();
  return (
    <div className="h-13 flex items-center justify-between border-border border-b px-6">
      <Button
        className="text-lg font-bold"
        variant="link"
        size="lg"
        onClick={() => navigate({ to: "/" })}
      >
        rizrmdhn.com
      </Button>
      <ModeToggle />
    </div>
  );
}
