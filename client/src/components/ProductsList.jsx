import { motion } from "framer-motion";
import { Trash, Star } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";

const ProductsList = () => {
  const { deleteProduct, toggleFeaturedProduct, products } = useProductStore();

  return (
    <motion.div
      className="bg-gradient-to-r from-[#0f172a] to-blue-900 shadow-2xl rounded-2xl overflow-hidden max-w-6xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <table className="min-w-full divide-y divide-blue-800">
        <thead className="bg-gradient-to-r from-[#0f172a] to-blue-900">
          <tr>
            {["Product", "Price", "Category", "Featured", "Actions"].map((header) => (
              <th
                key={header}
                className="px-6 py-4 text-left text-sm font-semibold text-blue-300 uppercase tracking-wide"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-blue-800 bg-gradient-to-r from-[#0f172a] to-blue-900">
          {products?.map((product) => (
            <tr key={product._id} className="hover:bg-blue-800 transition-colors duration-300">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-3">
                  <img
                    className="h-12 w-12 rounded-full object-cover border-none shadow-md"
                    src={product.image}
                    alt={product.name}
                  />
                  <div className="text-sm font-medium text-white">{product.name[0].toUpperCase()+ product.name.slice(1)}</div>
                </div>
              </td>

              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-blue-200 font-semibold">
                  ${product.price.toFixed(2)}
                </div>
              </td>

              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-blue-200">
                  {product.category[0].toUpperCase() + product.category.slice(1)}
                </div>
              </td>

              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  onClick={() => toggleFeaturedProduct(product._id)}
                  className={`p-2 rounded-full transition-all duration-300 ease-in-out transform shadow-md ${
                    product.isFeatured
                      ? "bg-yellow-400 text-blue-900 hover:bg-yellow-500"
                      : "bg-blue-700 text-blue-200 hover:bg-blue-600"
                  }`}
                >
                  <Star className="h-5 w-5" />
                </button>
              </td>

              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  onClick={() => deleteProduct(product._id)}
                  className="text-red-400 hover:text-red-300 transition-transform duration-200 hover:scale-110"
                >
                  <Trash className="h-6 w-6" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
};

export default ProductsList;
