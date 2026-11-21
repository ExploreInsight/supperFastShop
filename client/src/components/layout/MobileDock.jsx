import { NavLink } from "react-router-dom";
import { Heart, Home, LayoutGrid, ShoppingBag, UserRound } from "lucide-react";
import { useCartStore } from "../../stores/useCartStore";
import { useUserStore } from "../../stores/useUserStore";
import { useWishlistStore } from "../../stores/useWishlistStore";

// Thumb-reach navigation for phones: the shop's primary audience.
const MobileDock = () => {
  const user = useUserStore((s) => s.user);
  const cartCount = useCartStore((s) => s.cart.reduce((n, i) => n + i.quantity, 0));
  const wishCount = useWishlistStore((s) => s.items.length);

  const items = [
    { to: "/", label: "Home", icon: Home, end: true },
    { to: "/shop", label: "Shop", icon: LayoutGrid },
    { to: "/wishlist", label: "Saved", icon: Heart, count: wishCount },
    { to: "/cart", label: "Cart", icon: ShoppingBag, count: cartCount },
    { to: user ? "/orders" : "/login", label: user ? "Me" : "Log in", icon: UserRound },
  ];

  return (
    <nav aria-label="Primary" className="md:hidden fixed bottom-0 inset-x-0 z-30 bg-ink text-paper pb-[env(safe-area-inset-bottom)]">
      <ul className="grid grid-cols-5">
        {items.map(({ to, label, icon: Icon, end, count }) => (
          <li key={label}>
            <NavLink to={to} end={end} className={({ isActive }) => `relative flex flex-col items-center gap-0.5 py-2.5 text-[0.7rem] font-label font-semibold uppercase ${isActive ? "text-sticker" : ""}`}>
              <span className="relative">
                <Icon size={22} />
                {count > 0 && <span className="absolute -top-1.5 -right-2.5 min-w-4.5 h-4.5 px-1 rounded-full bg-sticker text-on-sticker text-[0.65rem] flex items-center justify-center num">{count}</span>}
              </span>
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default MobileDock;
