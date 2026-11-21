import { useEffect, useState } from "react";
import { useCartStore } from "../../stores/useCartStore";

const CouponBox = () => {
  const [code, setCode] = useState("");
  const { coupon, isCouponApplied, applyCoupon, getMyCoupon, removeCoupon } = useCartStore();

  useEffect(() => {
    getMyCoupon();
  }, [getMyCoupon]);
  useEffect(() => {
    if (coupon) setCode(coupon.code);
  }, [coupon]);

  return (
    <div>
      <label htmlFor="coupon" className="block font-label text-xs font-semibold uppercase tracking-wider mb-1.5">Coupon code</label>
      <div className="flex gap-2">
        <input id="coupon" value={code} onChange={(e) => setCode(e.target.value.toUpperCase())} disabled={isCouponApplied} placeholder="GIFT..." className="flex-1 min-w-0 bg-white/60 border-2 border-ink rounded-md px-3 py-2.5 font-label disabled:opacity-60" />
        {isCouponApplied ? (
          <button onClick={() => { removeCoupon(); setCode(""); }} className="px-4 border-2 border-ink rounded-md font-bold hover:bg-ink hover:text-paper">Remove</button>
        ) : (
          <button onClick={() => code && applyCoupon(code)} className="px-4 bg-ink text-paper rounded-md font-bold hover:bg-ink/85">Apply</button>
        )}
      </div>
      {coupon && !isCouponApplied && (
        <p className="mt-2 text-sm">You have a coupon: <span className="font-label font-semibold">{coupon.code}</span> ({coupon.discountPercentage}% off)</p>
      )}
    </div>
  );
};

export default CouponBox;
