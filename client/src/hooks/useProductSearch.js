import { useEffect, useRef, useState } from "react";
import axios from "../lib/axios";

// Server-side search. `params` is a plain object (q, category, size, sort, minPrice, maxPrice).
export function useProductSearch(params) {
  const key = JSON.stringify(params);
  const [state, setState] = useState({ products: [], total: 0, page: 1, pages: 1, loading: true, error: null });
  const reqId = useRef(0);

  useEffect(() => {
    const id = ++reqId.current;
    const t = setTimeout(async () => {
      setState((s) => ({ ...s, loading: true, error: null }));
      try {
        const { data } = await axios.get("/product/search", { params: { ...JSON.parse(key), page: 1 } });
        if (id === reqId.current) setState({ ...data, loading: false, error: null });
      } catch (e) {
        if (id === reqId.current) setState((s) => ({ ...s, loading: false, error: e.response?.data?.message || "Could not load products" }));
      }
    }, 200); // debounce typing
    return () => clearTimeout(t);
  }, [key]);

  const loadMore = async () => {
    if (state.page >= state.pages) return;
    const { data } = await axios.get("/product/search", { params: { ...JSON.parse(key), page: state.page + 1 } });
    setState((s) => ({ ...data, products: [...s.products, ...data.products], loading: false, error: null }));
  };

  return { ...state, loadMore };
}
