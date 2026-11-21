import { SIZES } from "../../lib/format";

// A run of stamped size cells. Sold-out sizes are ghost cells: drawn, never removed.
const SizeRun = ({ sizes = SIZES, soldOut = [], value, onChange, size = "md", interactive = true, className = "" }) => {
  const dims = size === "sm" ? "h-6 min-w-6 px-1 text-[0.65rem] sm:h-7 sm:min-w-7 sm:px-1.5 sm:text-xs" : "h-11 min-w-11 px-3 text-base";
  return (
    <div className={`flex flex-wrap gap-1 sm:gap-1.5 ${className}`} role={interactive ? "radiogroup" : undefined} aria-label="Size">
      {sizes.map((s) => {
        const out = soldOut.includes(s);
        const active = value === s;
        const base = `font-label font-semibold uppercase flex items-center justify-center rounded-[4px] border-2 transition-colors ${dims}`;
        if (!interactive) {
          return (
            <span key={s} className={`${base} ${out ? "border-dashed border-ink/30 text-ink/35 line-through" : "border-ink"}`}>
              {s}
            </span>
          );
        }
        return (
          <button
            key={s}
            type="button"
            role="radio"
            aria-checked={active}
            disabled={out}
            onClick={() => onChange?.(s)}
            title={out ? `${s} is sold out` : `Size ${s}`}
            className={`${base} ${
              out
                ? "border-dashed border-ink/30 text-ink/35 line-through cursor-not-allowed"
                : active
                ? "bg-ink text-paper border-ink"
                : "border-ink hover:bg-ink/10"
            }`}
          >
            {s}
          </button>
        );
      })}
    </div>
  );
};

export default SizeRun;
