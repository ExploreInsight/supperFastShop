import { Link } from "react-router-dom";

const VARIANTS = {
  // Price-gun sticker: the primary action
  sticker: "sticker px-5 py-3 text-xl hover:-translate-y-0.5",
  // Black woven-label button
  ink: "bg-ink text-paper hover:bg-ink/85 px-5 py-3 rounded-md font-bold",
  // Outline on paper
  line: "border-2 border-ink text-ink hover:bg-ink hover:text-paper px-5 py-3 rounded-md font-bold",
  // Outline on the field colour
  field: "border-2 border-on-field text-on-field hover:bg-on-field hover:text-field px-5 py-3 rounded-md font-bold",
};

const Btn = ({ variant = "ink", to, className = "", busy = false, disabled, children, ...rest }) => {
  const cls = `inline-flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed active:translate-y-px ${VARIANTS[variant]} ${className}`;
  if (to) {
    return (
      <Link to={to} className={cls} {...rest}>
        {children}
      </Link>
    );
  }
  return (
    <button className={cls} disabled={disabled || busy} aria-busy={busy || undefined} {...rest}>
      {busy ? "Working..." : children}
    </button>
  );
};

export default Btn;
