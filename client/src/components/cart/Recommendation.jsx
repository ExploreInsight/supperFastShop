import { useEffect, useState } from "react";
import axios from "../../lib/axios";
import ProductTag from "../shop/ProductTag";
import { useCartStore } from "../../stores/useCartStore";

const Recommendation = () => {
  const [items, setItems] = useState([]);
  const cart = useCartStore((s) => s.cart);
  useEffect(() => {
    axios.get("/product/recommendtion").then((r) => setItems(r.data)).catch(() => {});
  }, []);
  const shown = items.filter((p) => !cart.some((i) => i._id === p._id));
  if (!shown.length) return null;
  return (
    <section aria-labelledby="also" className="pt-20">
      <h2 id="also" className="text-5xl sm:text-6xl">You might like</h2>
      <ul className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-x-3 sm:gap-x-5 gap-y-8 sm:gap-y-10">
        {shown.map((p) => (
          <li key={p._id}><ProductTag product={{ soldOutSizes: [], ...p, sizes: p.sizes ?? ["XS", "S", "M", "L", "XL"] }} /></li>
        ))}
      </ul>
    </section>
  );
};

export default Recommendation;
