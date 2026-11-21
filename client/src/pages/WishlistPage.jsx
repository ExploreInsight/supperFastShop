import { useWishlistStore } from "../stores/useWishlistStore";
import ProductTag from "../components/shop/ProductTag";
import EmptyTag from "../components/ui/EmptyTag";
import Btn from "../components/ui/Btn";

const WishlistPage = () => {
  const { items, clear } = useWishlistStore();
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-8">
      <div className="flex items-end justify-between gap-4">
        <h1 className="text-6xl sm:text-8xl">Wishlist</h1>
        {items.length > 0 && <Btn variant="field" onClick={clear}>Clear all</Btn>}
      </div>
      {items.length === 0 ? (
        <EmptyTag title="Nothing saved" action={<Btn to="/shop">Browse the shop</Btn>}>
          Tap the heart on any tag to keep it here. Saved items stay on this device.
        </EmptyTag>
      ) : (
        <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-10">
          {items.map((p) => (
            <li key={p._id}><ProductTag product={{ sizes: ["XS", "S", "M", "L", "XL"], soldOutSizes: [], ...p }} /></li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WishlistPage;
