import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Heart } from "lucide-react";
import { useCartStore } from "../../stores/useCartStore";
import { useUserStore } from "../../stores/useUserStore";
import { useWishlistStore } from "../../stores/useWishlistStore";
import SizeRun from "../ui/SizeRun";
import Btn from "../ui/Btn";

const BuyBox = ({ product }) => {
  const navigate = useNavigate();
  const user = useUserStore((s) => s.user);
  const addToCart = useCartStore((s) => s.addToCart);
  const wished = useWishlistStore((s) => s.items.some((p) => p._id === product._id));
  const toggle = useWishlistStore((s) => s.toggle);
  const [size, setSize] = useState("");
  const [needSize, setNeedSize] = useState(false);

  const allGone = product.sizes.every((s) => product.soldOutSizes.includes(s));

  const add = () => {
    if (!user) {
      toast.error("Log in to add items to your cart", { id: "login" });
      navigate("/login");
      return;
    }
    if (!size) {
      setNeedSize(true);
      return;
    }
    addToCart(product, size);
  };

  return (
    <div>
      <div className="flex items-baseline justify-between">
        <span id="size-label" className="font-label text-xs font-semibold uppercase tracking-wider">Size</span>
        {needSize && !size && <span role="alert" className="font-bold text-sm">Pick a size first</span>}
      </div>
      <SizeRun sizes={product.sizes} soldOut={product.soldOutSizes} value={size} onChange={(s) => { setSize(s); setNeedSize(false); }} className="mt-2" />
      <div className="mt-6 flex items-center gap-3">
        <Btn variant="sticker" className="flex-1 min-w-0 text-3xl py-4 [--tilt:-0.8deg]" onClick={add} disabled={allGone}>
          {allGone ? "Sold out" : "Add to cart"}
        </Btn>
        <button
          onClick={() => toggle(product)}
          aria-pressed={wished}
          aria-label={wished ? "Remove from wishlist" : "Save to wishlist"}
          className="h-[60px] w-[60px] shrink-0 border-2 border-ink rounded-md flex items-center justify-center hover:bg-ink/10"
        >
          <Heart size={24} className={wished ? "fill-ink" : ""} />
        </button>
      </div>
    </div>
  );
};

export default BuyBox;
