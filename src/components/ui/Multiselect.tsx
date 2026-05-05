import { useState, useRef, useEffect } from "react";
import { ChevronDown, X } from "lucide-react";

interface Option {
  label: string;
  value: string;
}

interface MultiSelectProps {
  options: Option[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  emptyMessage?: string;
  disabled?: boolean;
  className?: string;
  maxDisplay?: number; // how many tags to show before "+N more"
}

const MultiSelect = ({
  options,
  value = [],
  onChange,
  placeholder = "Search...",
  emptyMessage = "No results found.",
  disabled = false,
  className = "",
  maxDisplay = 3,
}: MultiSelectProps) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // ✅ Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const selectedOptions = options.filter((o) => value.includes(o.value));

  const filtered = query.trim()
    ? options.filter((o) => o.label.toLowerCase().includes(query.toLowerCase()))
    : options;

  const toggle = (opt: Option) => {
    if (value.includes(opt.value)) {
      onChange(value.filter((v) => v !== opt.value));
    } else {
      onChange([...value, opt.value]);
    }
    setQuery("");
    inputRef.current?.focus();
  };

  const removeTag = (e: React.MouseEvent, val: string) => {
    e.stopPropagation();
    onChange(value.filter((v) => v !== val));
  };

  const clearAll = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange([]);
    setQuery("");
    inputRef.current?.focus();
  };

  const visibleTags = selectedOptions.slice(0, maxDisplay);
  const hiddenCount = selectedOptions.length - visibleTags.length;

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>

      {/* Input wrapper */}
      <div
        className={`
          flex flex-wrap items-center gap-1.5 min-h-10 w-full
          rounded-md border border-input bg-transparent
          px-3 py-2 text-sm shadow-sm transition-colors
          ${open ? "border-primary ring-1 ring-ring" : "hover:border-primary"}
          ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-text"}
        `}
        onClick={() => !disabled && inputRef.current?.focus()}
      >
        {/* Selected tags */}
        {visibleTags.map((o) => (
          <span
            key={o.value}
            className="inline-flex items-center gap-1 bg-lightprimary text-primary text-xs font-medium px-2 py-0.5 rounded-md shrink-0"
          >
            {o.label}
            {!disabled && (
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={(e) => removeTag(e, o.value)}
                className="hover:text-error transition-colors ml-0.5"
              >
                <X className="h-2.5 w-2.5" />
              </button>
            )}
          </span>
        ))}

        {/* +N more badge */}
        {hiddenCount > 0 && (
          <span className="inline-flex items-center bg-muted text-muted-foreground text-xs px-2 py-0.5 rounded-md shrink-0">
            +{hiddenCount} more
          </span>
        )}

        {/* Search input */}
        <input
          ref={inputRef}
          type="text"
          disabled={disabled}
          value={query}
          onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => !disabled && setOpen(true)}
          placeholder={selectedOptions.length === 0 ? placeholder : ""}
          className="flex-1 min-w-20 bg-transparent outline-none placeholder:text-muted-foreground text-foreground disabled:cursor-not-allowed py-0"
        />

        {/* Right icons */}
        <div className="flex items-center gap-1 ml-auto shrink-0">
          {selectedOptions.length > 0 && !disabled && (
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={clearAll}
              className="text-muted-foreground hover:text-foreground transition-colors p-0.5 rounded"
            >
              <X className="h-3 w-3" />
            </button>
          )}
          <ChevronDown
            className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          />
        </div>
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute z-50 mt-1 w-full rounded-md border border-border bg-popover shadow-md overflow-hidden">

          {/* Select all / Clear all row */}
          {options.length > 0 && (
            <div className="flex items-center justify-between px-3 py-1.5 border-b border-border bg-muted/40">
              <span className="text-xs text-muted-foreground">
                {selectedOptions.length} of {options.length} selected
              </span>
              <div className="flex gap-2">
                {selectedOptions.length < options.length && (
                  <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => onChange(options.map((o) => o.value))}
                    className="text-xs text-primary hover:underline"
                  >
                    Select all
                  </button>
                )}
                {selectedOptions.length > 0 && (
                  <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => onChange([])}
                    className="text-xs text-muted-foreground hover:text-error hover:underline transition-colors"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>
          )}

          <ul className="max-h-56 overflow-y-auto py-1">
            {filtered.length === 0 ? (
              <li className="px-3 py-2 text-sm text-muted-foreground text-center">
                {emptyMessage}
              </li>
            ) : (
              filtered.map((o) => {
                const isSelected = value.includes(o.value);
                return (
                  <li
                    key={o.value}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => toggle(o)}
                    className={`
                      flex items-center gap-2.5 px-3 py-2 text-sm cursor-pointer transition-colors
                      ${isSelected ? "bg-lightprimary text-primary" : "hover:bg-muted text-foreground"}
                    `}
                  >
                    {/* Checkbox */}
                    <span
                      className={`
                        inline-flex items-center justify-center w-4 h-4 rounded border shrink-0 transition-colors
                        ${isSelected
                          ? "bg-primary border-primary text-white"
                          : "border-input bg-background"
                        }
                      `}
                    >
                      {isSelected && (
                        <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                          <path d="M1 3.5L3.5 6L8 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </span>
                    <span className={isSelected ? "font-medium" : ""}>{o.label}</span>
                  </li>
                );
              })
            )}
          </ul>
        </div>
      )}

    </div>
  );
};

export default MultiSelect;