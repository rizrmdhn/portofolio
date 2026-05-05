import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import {
  IconDeviceDesktop,
  IconMoon,
  IconSun,
  IconSunset,
} from "@tabler/icons-react";

import { useTheme } from "@/components/theme-provider";

type ModeToggleType = "default" | "dropdown" | "segmented";

interface ModeToggleProps {
  type?: ModeToggleType;
}

const themes = [
  { value: "light", label: "Light", icon: IconSun },
  { value: "dark", label: "Dark", icon: IconMoon },
  { value: "warm", label: "Warm", icon: IconSunset },
  { value: "system", label: "System", icon: IconDeviceDesktop },
] as const;

function SegmentedToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <div className="flex items-center rounded-md border border-border bg-muted p-0.5 gap-0.5">
      {themes.map(({ value, label, icon: Icon }) => (
        <button
          key={value}
          onClick={() => setTheme(value)}
          className={cn(
            "flex items-center gap-1.5 rounded px-2.5 py-1.5 text-xs font-medium transition-colors cursor-pointer",
            theme === value
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          <Icon className="h-3.5 w-3.5" />
          {label}
        </button>
      ))}
    </div>
  );
}

function DropdownToggle() {
  const { theme, setTheme } = useTheme();
  const CurrentIcon =
    theme === "dark" ? IconMoon : theme === "warm" ? IconSunset : IconSun;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" size="icon" />}>
        <CurrentIcon className="h-[1.2rem] w-[1.2rem]" />
        <span className="sr-only">Toggle theme</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {themes.map(({ value, label, icon: Icon }) => (
          <DropdownMenuItem key={value} onClick={() => setTheme(value)}>
            <Icon className="mr-2 h-4 w-4" />
            {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function ModeToggle({ type = "default" }: ModeToggleProps) {
  if (type === "segmented") return <SegmentedToggle />;
  if (type === "dropdown") return <DropdownToggle />;

  return (
    <>
      <div className="hidden md:flex">
        <SegmentedToggle />
      </div>
      <div className="md:hidden">
        <DropdownToggle />
      </div>
    </>
  );
}
