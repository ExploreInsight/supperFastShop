import { useCartStore } from "../stores/useCartStore";
import CartLine from "../components/cart/CartLine";
import OrderSummary from "../components/cart/OrderSummary";
import Recommendation from "../components/cart/Recommendation";
import EmptyTag from "../components/ui/EmptyTag";
import Btn from "../components/ui/Btn";

const CartPage = () => {
  const cart = useCartStore((s) => s.cart);
  const count = cart.reduce((n, i) => n + i.quantity, 0);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-8">
      <h1 className="text-6xl sm:text-8xl">Cart <span className="font-label text-lg align-middle num">({count})</span></h1>
      {cart.length === 0 ? (
        <EmptyTag title="Cart is empty" action={<Btn to="/shop" variant="sticker">Start shopping</Btn>}>
          Nothing in here yet. Pick a size and add something.
        </EmptyTag>
      ) : (
        <div className="mt-8 grid lg:grid-cols-[1fr_380px] gap-8 items-start">
          <ul className="space-y-4">
            {cart.map((item) => (
              <li key={`${item._id}-${item.size}`}><CartLine item={item} /></li>
            ))}
          </ul>
          <OrderSummary />
        </div>
      )}
      <Recommendation />
    </div>
  );
};

export default CartPage;
