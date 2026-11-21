import { Link, useParams } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { useProduct } from "../hooks/useProduct";
import { money, titleCase } from "../lib/format";
import Tag from "../components/ui/Tag";
import Sticker from "../components/ui/Sticker";
import Rating from "../components/ui/Rating";
import Barcode from "../components/ui/Barcode";
import CareIcons from "../components/ui/CareIcons";
import EmptyTag from "../components/ui/EmptyTag";
import Spinner from "../components/ui/Spinner";
import Btn from "../components/ui/Btn";
import BuyBox from "../components/product/BuyBox";
import Reviews from "../components/product/Reviews";
import ProductTag from "../components/shop/ProductTag";

const ProductPage = () => {
  const { id } = useParams();
  const [{ product, related, loading, error }, patch] = useProduct(id);

  if (loading) return <Spinner />;
  if (error || !product)
    return (
      <EmptyTag title="Tag not found" action={<Btn to="/shop">Back to shop</Btn>}>
        {error || "That product is gone."}
      </EmptyTag>
    );

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-6">
        <Link to={`/shop?category=${product.category}`} className="inline-flex items-center gap-1 font-bold hover:underline underline-offset-4">
          <ChevronLeft size={18} /> {titleCase(product.category)}
        </Link>
      </div>

      <article className="mx-auto max-w-7xl px-4 sm:px-6 pt-10 grid grid-cols-[minmax(0,1fr)] lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        <div className="swing min-w-0" style={{ "--r1": "-1.2deg" }}>
          <Tag hole string className="px-5 sm:px-8 pt-16 pb-6" wrapClassName="max-w-xl mx-auto lg:mx-0">
            <div className="relative aspect-square bg-white rounded-sm flex items-center justify-center overflow-hidden">
              <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
            </div>
            <hr className="stitch my-4" />
            <div className="flex flex-wrap items-end justify-between gap-3">
              <CareIcons />
              <Barcode value={product._id} height={26} />
            </div>
          </Tag>
        </div>

        <div className="min-w-0">
          <h1 className="text-[clamp(3rem,8vw,6rem)] break-words">{titleCase(product.name)}</h1>
          <div className="mt-4 flex items-center gap-4 flex-wrap">
            <Sticker className="text-5xl px-4 py-2 num" tilt={-2.5}>{money(product.price)}</Sticker>
            <Rating value={product.ratingAverage} count={product.ratingCount} />
          </div>
          <p className="mt-6 max-w-prose text-lg">{titleCase(product.description)}</p>
          <hr className="stitch my-8" />
          <BuyBox key={product._id} product={product} />
        </div>
      </article>

      <Reviews productId={product._id} onRatingChange={patch} />

      {related.length > 0 && (
        <section aria-labelledby="related" className="mx-auto max-w-7xl px-4 sm:px-6 pt-20">
          <h2 id="related" className="text-5xl sm:text-7xl">More {product.category}</h2>
          <ul className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-x-3 sm:gap-x-5 gap-y-8 sm:gap-y-10">
            {related.map((p) => (
              <li key={p._id}><ProductTag product={p} /></li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
};

export default ProductPage;
