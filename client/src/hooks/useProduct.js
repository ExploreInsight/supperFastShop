import { useEffect, useState } from "react";
import axios from "../lib/axios";

export function useProduct(id) {
  const [state, setState] = useState({ product: null, related: [], loading: true, error: null });

  useEffect(() => {
    let live = true;
    setState({ product: null, related: [], loading: true, error: null });
    axios
      .get(`/product/${id}`)
      .then(({ data }) => live && setState({ ...data, loading: false, error: null }))
      .catch((e) => live && setState({ product: null, related: [], loading: false, error: e.response?.data?.message || "Product not found" }));
    return () => {
      live = false;
    };
  }, [id]);

  return [state, (patch) => setState((s) => ({ ...s, product: { ...s.product, ...patch } }))];
}
