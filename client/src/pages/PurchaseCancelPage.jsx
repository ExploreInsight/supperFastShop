import Tag from "../components/ui/Tag";
import Btn from "../components/ui/Btn";

const PurchaseCancelPage = () => (
  <div className="mx-auto max-w-md px-4 pt-20">
    <Tag hole string className="px-6 pt-16 pb-8 text-center">
      <h1 className="text-6xl">No charge</h1>
      <p className="mt-3 text-muted">Checkout was cancelled and your card was not charged. Your cart is still waiting.</p>
      <div className="mt-6 flex flex-col gap-2">
        <Btn to="/cart" variant="sticker">Back to cart</Btn>
        <Btn to="/shop" variant="line">Keep shopping</Btn>
      </div>
    </Tag>
  </div>
);

export default PurchaseCancelPage;
