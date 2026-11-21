import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Heart, Search, Settings, ShoppingBag, UserRound } from "lucide-react";
import { useCartStore } from "../../stores/useCartStore";
import { useUserStore } from "../../stores/useUserStore";
import { useWishlistStore } from "../../stores/useWishlistStore";
import WovenLabel from "../ui/WovenLabel";

const CountBadge = ({ n }) =>
  n > 0 ? (
    <span className="absolute -top-1.5 -right-1.5 min-w-5 h-5 px-1 rounded-full bg-ink text-sticker font-label text-[0.7rem] font-semibold flex items-center justify-center num">
      {n}
    </span>
  ) : null;

const iconBtn = "relative p-2.5 rounded-md hover:bg-on-field/10 transition-colors";

const Header = () => {
  const { user, logout } = useUserStore();
  const cartCount = useCartStore((s) => s.cart.reduce((n, i) => n + i.quantity, 0));
  const wishCount = useWishlistStore((s) => s.items.length);
  const navigate = useNavigate();
  const location = useLocation();
  const [params] = useSearchParams();
  const [q, setQ] = useState("");

  // keep the box in sync with the URL on /shop
  useEffect(() => {
    setQ(location.pathname === "/shop" ? params.get("q") ?? "" : "");
  }, [location.pathname, params]);

  const submit = (e) => {
    e.preventDefault();
    const term = q.trim();
    navigate(term ? `/shop?q=${encodeURIComponent(term)}` : "/shop");
  };

  return (
    <header className="relative z-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-3 flex items-center gap-3 sm:gap-6">
        <Link to="/" className="flex items-center gap-2 shrink-0" aria-label="SUPERFAST home">
          <span className="font-display font-black text-3xl sm:text-4xl leading-none tracking-tight">SUPERFAST</span>
          <WovenLabel className="hidden sm:inline-block">Shop</WovenLabel>
        </Link>

        <form onSubmit={submit} role="search" className="flex-1 min-w-0 max-w-xl ml-auto sm:ml-0">
          <label htmlFor="site-search" className="sr-only">
            Search products
          </label>
          <div className="flex items-center bg-paper text-ink rounded-md border-2 border-ink">
            <Search size={18} className="ml-3 shrink-0" aria-hidden="true" />
            <input
              id="site-search"
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search jeans, shoes, jackets"
              className="w-full bg-transparent px-2.5 py-2.5 text-base focus:outline-none"
            />
          </div>
        </form>

        <nav aria-label="Primary" className="hidden md:flex items-center gap-1 ml-auto">
          <NavLink to="/shop" className={({ isActive }) => `${iconBtn} font-bold px-3.5 ${isActive ? "underline underline-offset-8 decoration-2" : ""}`}>
            Shop
          </NavLink>
          <Link to="/wishlist" className={iconBtn} aria-label={`Wishlist, ${wishCount} saved`}>
            <Heart size={22} />
            <CountBadge n={wishCount} />
          </Link>
          <Link to="/cart" className={iconBtn} aria-label={`Cart, ${cartCount} items`}>
            <ShoppingBag size={22} />
            <CountBadge n={cartCount} />
          </Link>
          <Link to="/settings" className={iconBtn} aria-label="Settings">
            <Settings size={22} />
          </Link>
          {user ? (
            <div className="relative group">
              <button className={iconBtn} aria-label="Account" aria-haspopup="menu">
                <UserRound size={22} />
              </button>
              <div className="absolute right-0 top-full pt-2 hidden group-hover:block group-focus-within:block">
                <div className="tag-wrap">
                  <ul className="tag min-w-44 py-2 font-bold" role="menu">
                    <li className="px-4 py-1.5 font-label text-xs text-muted truncate">{user.name}</li>
                    <li><Link role="menuitem" to="/orders" className="block px-4 py-2 hover:bg-ink hover:text-paper">Orders</Link></li>
                    {user.role === "admin" && <li><Link role="menuitem" to="/admin-dashboard" className="block px-4 py-2 hover:bg-ink hover:text-paper">Dashboard</Link></li>}
                    <li><button role="menuitem" onClick={logout} className="w-full text-left px-4 py-2 hover:bg-ink hover:text-paper">Log out</button></li>
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <Link to="/login" className="ml-1 sticker px-3.5 py-2 text-lg hover:-translate-y-0.5 transition-transform" style={{ "--tilt": "-1.5deg" }}>
              Log in
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
