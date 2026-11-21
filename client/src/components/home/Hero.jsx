import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import { CATEGORIES, SIZES } from "../../lib/format";
import Tag from "../ui/Tag";
import Btn from "../ui/Btn";
import Barcode from "../ui/Barcode";

const Hero = () => {
  const navigate = useNavigate();
  const [q, setQ] = useState("");

  const search = (e) => {
    e.preventDefault();
    navigate(q.trim() ? `/shop?q=${encodeURIComponent(q.trim())}` : "/shop");
  };

  return (
    <section className="relative mx-auto max-w-7xl px-4 sm:px-6 pt-16 pb-14 lg:pt-20 grid lg:grid-cols-12 gap-10 lg:gap-6 items-start">
      <div className="lg:col-span-8 swing drop-in" style={{ "--r0": "-5deg", "--r1": "-2deg" }}>
        <Tag hole string className="px-6 sm:px-12 pt-14 pb-7" wrapClassName="max-w-4xl">
          <h1 className="text-[clamp(3.25rem,15vw,8.5rem)] leading-[0.85]">Superfast</h1>

          <form onSubmit={search} role="search" className="mt-5 flex items-center border-2 border-ink rounded-md bg-white/60">
            <Search size={18} className="ml-3 shrink-0" aria-hidden="true" />
            <label htmlFor="hero-search" className="sr-only">
              Search the shop
            </label>
            <input
              id="hero-search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="What are you after?"
              className="flex-1 min-w-0 bg-transparent px-2.5 py-3 text-base focus:outline-none"
            />
            <button className="mr-1.5 bg-ink text-paper rounded px-3.5 py-2 font-bold text-sm">Go</button>
          </form>

          <p className="mt-5 font-label text-xs font-semibold uppercase tracking-wider">Shop your size</p>
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {SIZES.map((s) => (
              <li key={s}>
                <Link
                  to={`/shop?size=${s}`}
                  className="h-12 min-w-12 px-3 rounded-[4px] border-2 border-ink font-label font-semibold flex items-center justify-center hover:bg-ink hover:text-paper transition-colors"
                >
                  {s}
                </Link>
              </li>
            ))}
          </ul>

          <hr className="stitch my-5" />
          <div className="flex items-end justify-between gap-4">
            <Btn to="/shop" variant="sticker" className="whitespace-nowrap text-3xl sm:text-4xl px-6 sm:px-7 py-4">
              Shop now
            </Btn>
            <Barcode value="SUPERFAST-0001" className="hidden sm:inline-block" />
          </div>
        </Tag>
      </div>

      <div className="lg:col-span-4 lg:pt-16">
        <p className="font-display font-black uppercase text-[clamp(2.75rem,5.5vw,4.75rem)] leading-[0.88]">
          Pick a size.
          <br />
          Add it.
          <br />
          Pay.
        </p>
        <p className="mt-5 max-w-sm text-lg">Jeans, tees, shoes, shades, jackets, suits and bags. Search, filter and check out without the detours.</p>
      </div>
      <ul className="lg:col-span-12 flex flex-wrap gap-2 sm:gap-3 -mt-2" aria-label="Categories">
        {CATEGORIES.map((c, i) => (
          <li key={c.slug}>
            <Link to={`/shop?category=${c.slug}`} className="tag-wrap block hover:-translate-y-1 transition-transform" style={{ transform: `rotate(${[-2, 1.5, -1, 2, -1.5, 1, -2][i]}deg)` }}>
              <span className="tag block px-4 py-2.5 font-display font-black uppercase text-2xl leading-none" style={{ "--cut": "9px" }}>{c.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Hero;
