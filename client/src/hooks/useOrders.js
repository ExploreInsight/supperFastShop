import { useEffect, useState } from "react";
import axios from "../lib/axios";

export function useOrders() {
  const [state, setState] = useState({ orders: [], loading: true, error: null });
  useEffect(() => {
    let live = true;
    axios
      .get("/orders/mine")
      .then(({ data }) => live && setState({ orders: data.orders, loading: false, error: null }))
      .catch((e) => live && setState({ orders: [], loading: false, error: e.response?.data?.message || "Could not load orders" }));
    return () => {
      live = false;
    };
  }, []);
  return state;
}
