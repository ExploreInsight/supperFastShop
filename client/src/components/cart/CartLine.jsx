import { Link } from "react-router-dom";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCartStore } from "../../stores/useCartStore";
import { money, titleCase } from "../../lib/format";
import Tag from "../ui/Tag";
import WovenLabel from "../ui/WovenLabel";

const step = "h-9 w-9 flex items-center justify-center border-2 border-ink rounded-[4px] hover:bg-ink hover:text-paper transition-colors";

const CartLine = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCartStore();
  const size = item.size || "";

  return (
    <Tag className="p-4 flex gap-4 items-start">
      <Link to={`/product/${item._id}`} className="shrink-0">
        <img src={item.image} alt="" className="h-24 w-24 sm:h-28 sm:w-28 object-contain bg-white rounded-sm" />
      </Link>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between gap-3">
          <div className="min-w-0">
            <Link to={`/product/${item._id}`} className="block text-3xl leading-[0.95] font-display font-black uppercase hover:underline underline-offset-4 break-words">{titleCase(item.name)}</Link>
            <div className="mt-1.5 flex items-center gap-2">
              {size && <WovenLabel>Size {size}</WovenLabel>}
              <span className="font-label text-xs text-muted num">{money(item.price)} each</span>
            </div>
          </div>
          <p className="font-display font-black text-3xl num shrink-0">{money(item.price * item.quantity)}</p>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button className={step} aria-label="Decrease quantity" onClick={() => updateQuantity(item._id, item.quantity - 1, size)}><Minus size={16} /></button>
            <span className="w-8 text-center font-label font-semibold num" aria-live="polite">{item.quantity}</span>
            <button className={step} aria-label="Increase quantity" onClick={() => updateQuantity(item._id, item.quantity + 1, size)}><Plus size={16} /></button>
          </div>
          <button onClick={() => removeFromCart(item._id, size)} className="flex items-center gap-1.5 font-bold hover:underline underline-offset-4"><Trash2 size={16} /> Remove</button>
        </div>
      </div>
    </Tag>
  );
};

export default CartLine;
