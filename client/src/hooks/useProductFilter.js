import { useMemo, useState } from "react";

const SORTERS = {
  "price-asc": (a, b) => a.price - b.price,
  "price-desc": (a, b) => b.price - a.price,
  name: (a, b) => a.name.localeCompare(b.name),
};

export function useProductFilter(products) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("default");

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = (products ?? []).filter((p) => p.name.toLowerCase().includes(q));
    return SORTERS[sort] ? [...list].sort(SORTERS[sort]) : list;
  }, [products, query, sort]);

  return { query, setQuery, sort, setSort, visible };
}
