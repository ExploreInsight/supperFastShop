import { Link } from "react-router-dom";
import { CATEGORIES } from "../../lib/format";
import Tag from "../ui/Tag";
import Barcode from "../ui/Barcode";
import MoreTag from "../shop/MoreTag";

const tilts = [-2, 1.5, -1, 2, -1.5, 1, -2.5];

const CategoryTags = () => (
  <section aria-labelledby="cats" className="mx-auto max-w-7xl px-4 sm:px-6 pt-16">
    <h2 id="cats" className="text-5xl sm:text-7xl">Shop by category</h2>
    <ul className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
      {CATEGORIES.map((c, i) => (
        <li key={c.slug}>
          <Link to={`/shop?category=${c.slug}`} className="block group focus-visible:outline-offset-8">
            <Tag hole className="px-4 pt-12 pb-4 transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:-translate-y-1.5" style={{ transform: `rotate(${tilts[i]}deg)` }}>
              <p className="font-display font-black uppercase text-5xl sm:text-6xl leading-[0.9]">{c.name}</p>
              <hr className="stitch my-3" />
              <div className="flex items-end justify-between">
                <Barcode value={c.slug.toUpperCase()} height={22} label={false} />
                <span className="font-label text-xs font-semibold group-hover:underline">Shop &rarr;</span>
              </div>
            </Tag>
          </Link>
        </li>
      ))}
      <li><MoreTag tilt={-1}>All products</MoreTag></li>
    </ul>
  </section>
);

export default CategoryTags;
