import { Star, Trash2 } from "lucide-react";
import { useProductStore } from "../../stores/useProductStore";
import { money, titleCase } from "../../lib/format";
import Tag from "../ui/Tag";

const ProductTable = () => {
  const { products, deleteProduct, toggleFeaturedProduct } = useProductStore();
  if (!products?.length) return <Tag className="p-8 text-center max-w-md mx-auto"><p className="font-bold">No products yet. Create one on the Create tab, or load the demo products above.</p></Tag>;

  return (
    <Tag className="overflow-x-auto">
      <table className="w-full min-w-[640px] text-left">
        <thead>
          <tr className="font-label text-xs uppercase tracking-wider border-b-2 border-ink">
            {["Product", "Price", "Category", "Featured", "Delete"].map((h) => <th key={h} scope="col" className="px-4 py-3">{h}</th>)}
          </tr>
        </thead>
        <tbody className="divide-y divide-ink/15">
          {products.map((p) => (
            <tr key={p._id}>
              <td className="px-4 py-3 flex items-center gap-3">
                <img src={p.image} alt="" className="h-12 w-12 object-contain bg-white rounded-sm" />
                <span className="font-bold">{titleCase(p.name)}</span>
              </td>
              <td className="px-4 py-3 num font-bold">{money(p.price)}</td>
              <td className="px-4 py-3">{titleCase(p.category)}</td>
              <td className="px-4 py-3">
                <button onClick={() => toggleFeaturedProduct(p._id)} aria-pressed={p.isFeatured} aria-label={p.isFeatured ? "Unfeature" : "Feature"} className={`p-2 rounded-md border-2 border-ink ${p.isFeatured ? "bg-sticker" : "hover:bg-ink/10"}`}>
                  <Star size={18} className={p.isFeatured ? "fill-ink" : ""} />
                </button>
              </td>
              <td className="px-4 py-3">
                <button onClick={() => deleteProduct(p._id)} aria-label={`Delete ${p.name}`} className="p-2 rounded-md border-2 border-ink hover:bg-ink hover:text-paper"><Trash2 size={18} /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Tag>
  );
};

export default ProductTable;
