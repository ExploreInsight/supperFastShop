import { ShoppingCart, Heart } from "lucide-react";
import { useWishlistStore } from "../stores/useWishlistStore";
import toast from "react-hot-toast";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";

const ProductCard = ({ product }) => {
  const { user } = useUserStore();
  const { addToCart } = useCartStore();
  const wished = useWishlistStore((s) => s.items.some((p) => p._id === product._id));
  const toggleWish = useWishlistStore((s) => s.toggle);

  const handleAddToCart = () => {
    if (!user) {
      toast.error("Please login to add items to your cart", { id: "login" });
      return;
    }
    addToCart(product);
  };

  return (
    <div className="w-64 bg-gradient-to-br from-[var(--app-card,#0f172a)] to-blue-900 rounded-xl shadow-xl border border-blue-700/40 p-4">
      {/* Image Container */}
      <div className="relative h-48 bg-white rounded-lg flex items-center justify-center overflow-hidden">
        <button
          onClick={() => toggleWish(product)}
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={wished}
          className="absolute top-2 right-2 z-10 p-1.5 rounded-full bg-gray-900/70 hover:bg-gray-900 transition-colors"
        >
          <Heart
            size={18}
            className={wished ? "fill-rose-500 text-rose-500" : "text-white"}
          />
        </button>
        <img
          src={product.image}
          alt={product.name}
          className="max-h-full object-contain transition-transform duration-300 ease-in-out hover:scale-105"
        />
      </div>

      {/* Product Details */}
      <div className="p-4">
        <h3 className="text-xl font-semibold text-white mb-1">
          {product.name[0].toUpperCase() + product.name.slice(1)}
        </h3>
        <p className="text-blue-300 text-lg font-medium mb-4">
          ${product.price.toFixed(2)}
        </p>
        <button
          onClick={handleAddToCart}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded flex items-center justify-center transition-colors duration-300"
        >
          <ShoppingCart className="w-5 h-5 mr-2" />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
