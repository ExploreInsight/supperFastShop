import { CATEGORIES, SIZES } from "../../lib/format";
import SizeRun from "../ui/SizeRun";

const SORTS = [
  { value: "new", label: "Newest" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "rating", label: "Top rated" },
];

const label = "block font-label text-xs font-semibold uppercase tracking-wider mb-2";

// Controlled by URL search params (see ShopPage).
const FilterPanel = ({ filters, onChange, onClear }) => (
  <div className="space-y-6">
    <div>
      <span className={label}>Category</span>
      <ul className="flex flex-wrap gap-2">
        {CATEGORIES.map((c) => {
          const on = filters.category === c.slug;
          return (
            <li key={c.slug}>
              <button
                aria-pressed={on}
                onClick={() => onChange({ category: on ? "" : c.slug })}
                className={`px-3 py-1.5 rounded-[4px] border-2 border-ink font-bold text-sm transition-colors ${on ? "bg-ink text-paper" : "hover:bg-ink/10"}`}
              >
                {c.name}
              </button>
            </li>
          );
        })}
      </ul>
    </div>

    <div>
      <span className={label}>Size</span>
      <SizeRun sizes={SIZES} value={filters.size} onChange={(s) => onChange({ size: filters.size === s ? "" : s })} size="sm" />
    </div>

    <div>
      <span className={label}>Price (USD)</span>
      <div className="flex items-center gap-2">
        <input aria-label="Minimum price" inputMode="numeric" placeholder="Min" value={filters.minPrice} onChange={(e) => onChange({ minPrice: e.target.value.replace(/\D/g, "") })} className="w-full bg-white/60 border-2 border-ink rounded-md px-3 py-2 num" />
        <span aria-hidden="true">-</span>
        <input aria-label="Maximum price" inputMode="numeric" placeholder="Max" value={filters.maxPrice} onChange={(e) => onChange({ maxPrice: e.target.value.replace(/\D/g, "") })} className="w-full bg-white/60 border-2 border-ink rounded-md px-3 py-2 num" />
      </div>
    </div>

    <div>
      <label htmlFor="sort" className={label}>Sort</label>
      <select id="sort" value={filters.sort} onChange={(e) => onChange({ sort: e.target.value })} className="w-full bg-white/60 border-2 border-ink rounded-md px-3 py-2.5 font-medium">
        {SORTS.map((s) => (
          <option key={s.value} value={s.value}>{s.label}</option>
        ))}
      </select>
    </div>

    <button onClick={onClear} className="font-bold underline underline-offset-4 hover:no-underline">Clear all filters</button>
  </div>
);

export default FilterPanel;
