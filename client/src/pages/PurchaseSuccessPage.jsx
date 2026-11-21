import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import axios from "../lib/axios";
import { useCartStore } from "../stores/useCartStore";
import { PALETTES } from "../lib/theme";
import Tag from "../components/ui/Tag";
import Sticker from "../components/ui/Sticker";
import Barcode from "../components/ui/Barcode";
import Btn from "../components/ui/Btn";
import Spinner from "../components/ui/Spinner";

const PurchaseSuccessPage = () => {
  const clearCart = useCartStore((s) => s.clearCart);
  const [state, setState] = useState({ busy: true, error: null, orderId: null });

  useEffect(() => {
    const sessionId = new URLSearchParams(window.location.search).get("session_id");
    if (!sessionId) {
      setState({ busy: false, error: "No checkout session found in the link.", orderId: null });
      return;
    }
    axios
      .post("/payment/checkout-success", { sessionId })
      .then((r) => {
        clearCart();
        setState({ busy: false, error: null, orderId: r.data.orderId });
      })
      .catch((e) => setState({ busy: false, error: e.response?.data?.message || "We could not confirm your order.", orderId: null }));
  }, [clearCart]);

  if (state.busy) return <Spinner label="Confirming your order" />;

  return (
    <div className="mx-auto max-w-md px-4 pt-20">
      {!state.error && (
        <Confetti width={window.innerWidth} height={window.innerHeight} recycle={false} numberOfPieces={400} gravity={0.15} colors={[...PALETTES.map((p) => p.sticker), "#0b0b0b", "#f7f4ec"]} style={{ zIndex: 40, pointerEvents: "none" }} />
      )}
      <div className="swing" style={{ "--r1": "-1.5deg" }}>
        <Tag hole string className="px-6 pt-16 pb-8 text-center">
          <Sticker className="text-6xl px-6 py-3" tilt={-4}>{state.error ? "Hmm" : "Paid"}</Sticker>
          <h1 className="mt-6 text-5xl">{state.error ? "Could not confirm" : "Order placed"}</h1>
          <p className="mt-3 text-muted">{state.error ?? "Thanks. A coupon may be waiting in your cart on the next order."}</p>
          {state.orderId && <div className="mt-5 flex justify-center"><Barcode value={state.orderId} /></div>}
          <div className="mt-6 flex flex-col gap-2">
            {!state.error && <Btn to="/orders" variant="ink">View orders</Btn>}
            <Btn to="/shop" variant="line">Keep shopping</Btn>
          </div>
        </Tag>
      </div>
    </div>
  );
};

export default PurchaseSuccessPage;
