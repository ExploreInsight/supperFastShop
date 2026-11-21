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
    <Tag className="p-3 sm:p-4 flex gap-3 sm:gap-4 items-start">
      <Link to={`/product/${item._id}`} className="shrink-0">
        <img src={item.image} alt="" className="h-20 w-20 sm:h-28 sm:w-28 object-contain bg-white rounded-sm" />
      </Link>
      <div className="flex-1 min-w-0">
        <Link to={`/product/${item._id}`} className="block text-2xl sm:text-3xl leading-[0.95] font-display font-black uppercase hover:underline underline-offset-4 break-words">{titleCase(item.name)}</Link>
        <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1">
          {size && <WovenLabel className="whitespace-nowrap">Size {size}</WovenLabel>}
          <span className="font-label text-xs text-muted num whitespace-nowrap">{money(item.price)} each</span>
        </div>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
          <div className="flex items-center gap-2">
            <button className={step} aria-label="Decrease quantity" onClick={() => updateQuantity(item._id, item.quantity - 1, size)}><Minus size={16} /></button>
            <span className="w-8 text-center font-label font-semibold num" aria-live="polite">{item.quantity}</span>
            <button className={step} aria-label="Increase quantity" onClick={() => updateQuantity(item._id, item.quantity + 1, size)}><Plus size={16} /></button>
          </div>
          <p className="font-display font-black text-3xl num">{money(item.price * item.quantity)}</p>
        </div>
        <button onClick={() => removeFromCart(item._id, size)} className="mt-2 flex items-center gap-1.5 font-bold text-sm hover:underline underline-offset-4"><Trash2 size={15} /> Remove</button>
      </div>
    </Tag>
  );
};

export default CartLine;
