import { useEffect, useState } from "react";
import axios from "../../lib/axios";
import ProductTag from "../shop/ProductTag";

const Recommendation = () => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    axios.get("/product/recommendtion").then((r) => setItems(r.data)).catch(() => {});
  }, []);
  if (!items.length) return null;
  return (
    <section aria-labelledby="also" className="pt-20">
      <h2 id="also" className="text-5xl sm:text-6xl">People also bought</h2>
      <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-10">
        {items.map((p) => (
          <li key={p._id}><ProductTag product={{ soldOutSizes: [], ...p, sizes: p.sizes ?? ["XS", "S", "M", "L", "XL"] }} /></li>
        ))}
      </ul>
    </section>
  );
};

export default Recommendation;
