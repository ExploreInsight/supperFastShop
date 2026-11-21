import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import ProductCard from "../components/ProductCard";
import { useWishlistStore } from "../stores/useWishlistStore";

const WishlistPage = () => {
  const { items, clear } = useWishlistStore();

  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent py-1">
          Wishlist
        </h1>
        {items.length > 0 && (
          <button
            onClick={clear}
            className="px-3 py-2 rounded-md border border-gray-700 bg-gray-800 text-gray-300 hover:text-white hover:bg-gray-700 transition-colors"
          >
            Clear all
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[40vh] text-center">
          <Heart className="w-12 h-12 text-blue-400 mb-3" />
          <h2 className="text-2xl font-bold mb-2">Nothing saved yet</h2>
          <p className="text-gray-400 mb-5">
            Tap the heart on any product to save it here.
          </p>
          <Link
            to="/"
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm transition-colors"
          >
            Browse categories
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
          {items.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
