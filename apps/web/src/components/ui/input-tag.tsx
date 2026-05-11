import { cn } from "@/lib/utils";
import { IconX } from "@tabler/icons-react";
import {
  forwardRef,
  KeyboardEvent,
  useCallback,
  useRef,
  useState,
} from "react";

interface InputTagProps {
  value?: string[];
  onChange?: (tags: string[]) => void;
  onBlur?: () => void;
  name?: string;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  maxTags?: number;
  error?: string;
}

const InputTag = forwardRef<HTMLDivElement, InputTagProps>(
  (
    {
      value = [],
      onChange,
      onBlur,
      name: _name,
      disabled = false,
      placeholder = "Add a tag...",
      className,
      maxTags,
      error,
    },
    ref,
  ) => {
    const [inputValue, setInputValue] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    const addTag = useCallback(
      (raw: string) => {
        const trimmed = raw.trim();
        if (!trimmed || value.includes(trimmed)) return;
        if (maxTags !== undefined && value.length >= maxTags) return;
        onChange?.([...value, trimmed]);
        setInputValue("");
      },
      [value, onChange, maxTags],
    );

    const removeTag = useCallback(
      (index: number) => {
        onChange?.(value.filter((_, i) => i !== index));
      },
      [value, onChange],
    );

    const handleKeyDown = useCallback(
      (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" || e.key === ",") {
          e.preventDefault();
          addTag(inputValue);
        } else if (e.key === "Backspace" && !inputValue && value.length > 0) {
          removeTag(value.length - 1);
        }
      },
      [addTag, inputValue, removeTag, value.length],
    );

    const handleBlur = useCallback(() => {
      if (inputValue.trim()) addTag(inputValue);
      onBlur?.();
    }, [addTag, inputValue, onBlur]);

    const handlePaste = useCallback(
      (e: React.ClipboardEvent<HTMLInputElement>) => {
        const pasted = e.clipboardData.getData("text");
        if (!pasted.includes(",")) return;
        e.preventDefault();
        pasted.split(",").forEach((part) => addTag(part));
      },
      [addTag],
    );

    const isAtMax = maxTags !== undefined && value.length >= maxTags;

    return (
      <div
        ref={ref}
        className={cn(
          "flex min-h-7 w-full flex-wrap items-center gap-1 rounded-md border border-input bg-input/20 px-2 py-1 transition-colors",
          "focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/30",
          disabled && "pointer-events-none cursor-not-allowed opacity-50",
          error &&
            "border-destructive ring-2 ring-destructive/20 dark:ring-destructive/40",
          className,
        )}
        onClick={() => !disabled && inputRef.current?.focus()}
      >
        {value.map((tag, index) => (
          <span
            key={`${tag}-${index}`}
            className="inline-flex items-center gap-1 rounded-full border border-border bg-input/30 px-2 py-0.5 text-[0.625rem] font-medium text-foreground"
          >
            {tag}
            {!disabled && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeTag(index);
                }}
                className="flex items-center text-muted-foreground transition-colors hover:text-foreground"
              >
                <IconX className="size-2.5" />
              </button>
            )}
          </span>
        ))}

        {!isAtMax && (
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            onPaste={handlePaste}
            disabled={disabled}
            placeholder={value.length === 0 ? placeholder : ""}
            className="min-w-20 flex-1 bg-transparent text-xs/relaxed outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed"
          />
        )}
      </div>
    );
  },
);

InputTag.displayName = "InputTag";

export default InputTag;
