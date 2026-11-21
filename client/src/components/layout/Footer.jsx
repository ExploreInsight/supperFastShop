import { Link } from "react-router-dom";
import { CATEGORIES } from "../../lib/format";

const Footer = () => (
  <footer className="mt-24 bg-ink text-paper pb-24 md:pb-0">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 grid gap-10 md:grid-cols-[2fr_1fr_1fr]">
      <div>
        <p className="font-display font-black text-6xl sm:text-8xl leading-[0.85] uppercase text-sticker">Superfast</p>
        <p className="mt-4 max-w-sm text-paper/70">Streetwear and accessories. Pick a size, add to cart, pay.</p>
      </div>
      <nav aria-label="Shop by category">
        <h2 className="font-label text-sm font-semibold tracking-widest text-sticker mb-3 leading-none">Shop</h2>
        <ul className="space-y-1.5">
          {CATEGORIES.map((c) => (
            <li key={c.slug}>
              <Link className="hover:text-sticker" to={`/shop?category=${c.slug}`}>{c.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <nav aria-label="Account">
        <h2 className="font-label text-sm font-semibold tracking-widest text-sticker mb-3 leading-none">You</h2>
        <ul className="space-y-1.5">
          <li><Link className="hover:text-sticker" to="/wishlist">Wishlist</Link></li>
          <li><Link className="hover:text-sticker" to="/orders">Orders</Link></li>
          <li><Link className="hover:text-sticker" to="/settings">Settings and colours</Link></li>
        </ul>
      </nav>
    </div>
    <hr className="stitch mx-4 sm:mx-6 text-paper" />
    <p className="mx-auto max-w-7xl px-4 sm:px-6 py-5 font-label text-xs text-paper/60">Prices in USD.</p>
  </footer>
);

export default Footer;
