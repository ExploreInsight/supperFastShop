import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { useWishlistStore } from "../../stores/useWishlistStore";
import { money, titleCase } from "../../lib/format";
import Tag from "../ui/Tag";
import Sticker from "../ui/Sticker";
import SizeRun from "../ui/SizeRun";
import WovenLabel from "../ui/WovenLabel";

// A product is a swing tag: the photo is a small window, price is a sticker, sizes are stamped cells.
const ProductTag = ({ product, tilt = 0 }) => {
  const wished = useWishlistStore((s) => s.items.some((p) => p._id === product._id));
  const toggle = useWishlistStore((s) => s.toggle);

  return (
    <Tag hole className="group w-full" style={{ transform: `rotate(${tilt}deg)` }}>
      <div className="px-2.5 sm:px-4 pt-10 sm:pt-12 pb-3 sm:pb-4">
        <Link to={`/product/${product._id}`} className="block focus-visible:outline-offset-4" aria-label={`${titleCase(product.name)}, ${money(product.price)}`}>
          <div className="relative aspect-square bg-white rounded-sm overflow-hidden flex items-center justify-center">
            <img src={product.image} alt="" loading="lazy" className="w-full h-full object-contain transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-105" />
            <Sticker className="absolute right-1.5 bottom-1.5 sm:right-2 sm:bottom-2 text-lg sm:text-2xl num" tilt={-3}>
              {money(product.price)}
            </Sticker>
          </div>
          <h3 className="mt-2 sm:mt-3 text-xl sm:text-[1.7rem] leading-[0.95] break-words">{titleCase(product.name)}</h3>
        </Link>
        <div className="mt-2 flex items-center justify-between gap-2">
          <WovenLabel>{product.category}</WovenLabel>
          <button
            onClick={() => toggle(product)}
            aria-pressed={wished}
            aria-label={wished ? "Remove from wishlist" : "Save to wishlist"}
            className="p-1.5 rounded-md hover:bg-ink/10"
          >
            <Heart size={20} className={wished ? "fill-ink" : ""} />
          </button>
        </div>
        <hr className="stitch my-2 sm:my-3" />
        <SizeRun sizes={product.sizes} soldOut={product.soldOutSizes} size="sm" interactive={false} />
      </div>
    </Tag>
  );
};

export default ProductTag;
