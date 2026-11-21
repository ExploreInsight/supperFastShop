import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal, X } from "lucide-react";
import { useProductSearch } from "../hooks/useProductSearch";
import { CATEGORIES } from "../lib/format";
import FilterPanel from "../components/shop/FilterPanel";
import ProductTag from "../components/shop/ProductTag";
import Tag from "../components/ui/Tag";
import EmptyTag from "../components/ui/EmptyTag";
import Btn from "../components/ui/Btn";
import Spinner from "../components/ui/Spinner";

const KEYS = ["q", "category", "size", "minPrice", "maxPrice", "sort"];

const ShopPage = () => {
  const [params, setParams] = useSearchParams();
  const [open, setOpen] = useState(false);

  const filters = useMemo(() => {
    const f = Object.fromEntries(KEYS.map((k) => [k, params.get(k) ?? ""]));
    return { ...f, sort: f.sort || "new" };
  }, [params]);

  const apiParams = useMemo(() => Object.fromEntries(Object.entries(filters).filter(([k, v]) => v && !(k === "sort" && v === "new"))), [filters]);
  const { products, total, page, pages, loading, error, loadMore } = useProductSearch(apiParams);

  const update = (patch) => {
    const next = new URLSearchParams(params);
    Object.entries(patch).forEach(([k, v]) => (v ? next.set(k, v) : next.delete(k)));
    setParams(next, { replace: true });
  };
  const clear = () => setParams({}, { replace: true });

  const chips = [
    filters.q && { k: "q", text: `"${filters.q}"` },
    filters.category && { k: "category", text: CATEGORIES.find((c) => c.slug === filters.category)?.name ?? filters.category },
    filters.size && { k: "size", text: `Size ${filters.size}` },
    (filters.minPrice || filters.maxPrice) && { k: "price", text: `$${filters.minPrice || 0} - ${filters.maxPrice ? "$" + filters.maxPrice : "up"}` },
  ].filter(Boolean);

  const dropChip = (k) => (k === "price" ? update({ minPrice: "", maxPrice: "" }) : update({ [k]: "" }));

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-8 pb-8">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <h1 className="text-6xl sm:text-8xl">
          {filters.category ? CATEGORIES.find((c) => c.slug === filters.category)?.name ?? "Shop" : "Shop"}
        </h1>
        <p className="font-label text-sm font-semibold num" aria-live="polite">{loading ? "Searching..." : `${total} ${total === 1 ? "item" : "items"}`}</p>
      </div>

      {chips.length > 0 && (
        <ul className="mt-5 flex flex-wrap gap-2" aria-label="Active filters">
          {chips.map((c) => (
            <li key={c.k}>
              <button onClick={() => dropChip(c.k)} className="sticker flex items-center gap-1.5 px-2.5 py-1.5 text-lg" aria-label={`Remove filter ${c.text}`}>
                {c.text} <X size={14} aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-8 grid lg:grid-cols-[280px_1fr] gap-8">
        <aside aria-label="Filters">
          <button onClick={() => setOpen((o) => !o)} aria-expanded={open} className="lg:hidden w-full flex items-center justify-between border-2 border-on-field rounded-md px-4 py-3 font-bold">
            <span className="flex items-center gap-2"><SlidersHorizontal size={18} /> Filters</span>
            <span className="font-label text-xs">{open ? "Hide" : "Show"}</span>
          </button>
          <div className={`${open ? "block" : "hidden"} lg:block mt-3 lg:mt-0 lg:sticky lg:top-4`}>
            <Tag className="p-5"><FilterPanel filters={filters} onChange={update} onClear={clear} /></Tag>
          </div>
        </aside>

        <section aria-label="Results">
          {loading && products.length === 0 ? (
            <Spinner label="Searching" />
          ) : error ? (
            <EmptyTag title="Could not load" action={<Btn onClick={() => window.location.reload()}>Try again</Btn>}>{error}</EmptyTag>
          ) : products.length === 0 ? (
            <EmptyTag title="Nothing here" action={<Btn onClick={clear}>Clear filters</Btn>}>
              No products match those filters.
            </EmptyTag>
          ) : (
            <>
              <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-5 gap-y-10">
                {products.map((p) => (
                  <li key={p._id}><ProductTag product={p} /></li>
                ))}
              </ul>
              {page < pages && (
                <div className="mt-12 flex justify-center">
                  <button onClick={loadMore} className="sticker text-3xl px-8 py-4 hover:-translate-y-0.5 transition-transform">Load more</button>
                </div>
              )}
            </>
          )}
        </section>
      </div>
    </div>
  );
};

export default ShopPage;
