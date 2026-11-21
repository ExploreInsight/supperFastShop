import { useEffect } from "react";
import { useProductStore } from "../../stores/useProductStore";
import ProductTag from "../shop/ProductTag";
import EmptyTag from "../ui/EmptyTag";
import Btn from "../ui/Btn";
import MoreTag from "../shop/MoreTag";
import Spinner from "../ui/Spinner";

const NewDrops = () => {
  const { products, loading, fetchFeaturedProducts } = useProductStore();

  useEffect(() => {
    fetchFeaturedProducts();
  }, [fetchFeaturedProducts]);

  return (
    <section aria-labelledby="drops" className="mx-auto max-w-7xl px-4 sm:px-6 pt-24">
      <div className="flex items-end justify-between gap-4">
        <h2 id="drops" className="text-5xl sm:text-7xl">Featured</h2>
        <Btn to="/shop" variant="field" className="shrink-0">See everything</Btn>
      </div>
      {loading && products.length === 0 ? (
        <Spinner />
      ) : products.length === 0 ? (
        <EmptyTag title="Rack is empty" action={<Btn to="/shop" variant="ink">Browse the shop</Btn>}>
          Nothing is featured yet. Browse the full range instead.
        </EmptyTag>
      ) : (
        <ul className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-x-3 sm:gap-x-5 gap-y-8 sm:gap-y-10">
          {products.slice(0, 8).map((p, i) => (
            <li key={p._id}>
              <ProductTag product={p} tilt={[-1, 0.8, -0.6, 1][i % 4]} />
            </li>
          ))}
          <li><MoreTag /></li>
        </ul>
      )}
    </section>
  );
};

export default NewDrops;
