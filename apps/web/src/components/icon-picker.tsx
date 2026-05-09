import { cn } from "@/lib/utils";
import {
  SOCIAL_ICON_MAP,
  SUPPORTED_SOCIAL_ICONS,
  type SocialIconName,
} from "@portofolio/constants";
import { IconImageInPicture } from "@tabler/icons-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

interface IconPickerProps {
  value?: string;
  onChange: (value: string) => void;
}

export function IconPicker({ value, onChange }: IconPickerProps) {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const SelectedIcon = value
    ? SOCIAL_ICON_MAP[value as SocialIconName]?.icon
    : null;

  const filteredIcons = SUPPORTED_SOCIAL_ICONS.filter((icon) =>
    icon.label.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button
            variant="outline"
            size="icon-sm"
            type="button"
            aria-label="Pick icon"
          />
        }
      >
        {SelectedIcon ? (
          <SelectedIcon className="size-4" />
        ) : (
          <IconImageInPicture className="size-4 text-muted-foreground" />
        )}
      </PopoverTrigger>
      <PopoverContent className="w-68 gap-2 p-2" align="start">
        <Input
          placeholder="Search icons..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="no-scrollbar grid max-h-48 grid-cols-8 gap-0.5 overflow-y-auto">
          {filteredIcons.map(({ name, label, icon: Icon }) => (
            <button
              key={name}
              type="button"
              title={label}
              onClick={() => {
                onChange(name);
                setOpen(false);
              }}
              className={cn(
                "flex size-8 items-center justify-center rounded-md transition-colors hover:bg-accent hover:text-accent-foreground",
                value === name && "bg-accent text-accent-foreground",
              )}
            >
              <Icon className="size-4" />
            </button>
          ))}
          {filteredIcons.length === 0 && (
            <p className="col-span-8 py-4 text-center text-muted-foreground text-xs">
              No icons found
            </p>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
