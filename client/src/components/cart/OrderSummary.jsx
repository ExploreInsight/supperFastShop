import { useState } from "react";
import toast from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";
import axios from "../../lib/axios";
import { useCartStore } from "../../stores/useCartStore";
import { money } from "../../lib/format";
import Tag from "../ui/Tag";
import Btn from "../ui/Btn";
import Barcode from "../ui/Barcode";
import CouponBox from "./CouponBox";

const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY ||
    "pk_test_51R7V3OPts4QNZmkETebJ33vdddH3J0ObbmFIkHRrh3VsWOs3ncAX4pXl7XBPCUj73yX4onEMF10hoTMjFDLggJlT00QwddzAQm"
);

const Row = ({ label, value, strong }) => (
  <div className={`flex justify-between gap-4 ${strong ? "font-display font-black text-4xl uppercase" : ""}`}>
    <dt>{label}</dt>
    <dd className="num font-bold">{value}</dd>
  </div>
);

const OrderSummary = () => {
  const { total, subtotal, coupon, isCouponApplied, cart } = useCartStore();
  const [busy, setBusy] = useState(false);
  const savings = subtotal - total;

  const pay = async () => {
    setBusy(true);
    try {
      const stripe = await stripePromise;
      const { data } = await axios.post("/payment/create-checkout-session", { products: cart, couponCode: coupon ? coupon.code : null });
      const result = await stripe.redirectToCheckout({ sessionId: data.id });
      if (result.error) toast.error(result.error.message);
    } catch (e) {
      toast.error(e.response?.data?.message || e.response?.data?.error || "Checkout failed. Try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <Tag hole string className="px-5 pt-14 pb-6" wrapClassName="mt-14 lg:mt-12">
      <h2 className="text-4xl">Total</h2>
      <dl className="mt-4 space-y-2">
        <Row label="Subtotal" value={money(subtotal)} />
        {isCouponApplied && coupon && <Row label={`Coupon ${coupon.code} (-${coupon.discountPercentage}%)`} value={`-${money(savings)}`} />}
        <hr className="stitch my-3" />
        <Row label="Pay" value={money(total)} strong />
      </dl>
      <hr className="stitch my-5" />
      <CouponBox />
      <Btn variant="sticker" className="w-full mt-6 text-3xl py-4" onClick={pay} busy={busy}>Checkout</Btn>
      <div className="mt-5 flex justify-center"><Barcode value={`CART-${cart.length}-${Math.round(total * 100)}`} height={24} /></div>
    </Tag>
  );
};

export default OrderSummary;
