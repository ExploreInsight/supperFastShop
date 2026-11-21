import { Link } from "react-router-dom";
import { PALETTES } from "../../lib/theme";
import { useThemeStore } from "../../stores/useThemeStore";

// A shortcut to recolour the shop without leaving the home page.
const ThemeBand = () => {
  const { palette, setPalette } = useThemeStore();
  return (
    <section aria-labelledby="colours" className="mx-auto max-w-7xl px-4 sm:px-6 pt-24">
      <div className="bg-ink text-paper rounded-md px-6 py-8 sm:px-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h2 id="colours" className="text-4xl sm:text-6xl text-sticker">Your shop, your colour</h2>
          <p className="mt-2 text-paper/70">Tap a swatch. It changes the whole shop and remembers your pick.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {PALETTES.map((p) => (
            <button
              key={p.id}
              onClick={() => setPalette(p.id)}
              aria-label={p.name}
              aria-pressed={palette === p.id}
              className={`w-11 h-11 rounded-full border-2 transition-transform hover:scale-110 ${palette === p.id ? "border-paper scale-110" : "border-paper/30"}`}
              style={{ background: p.field }}
            />
          ))}
          <Link to="/settings" className="ml-1 underline underline-offset-4 font-bold hover:text-sticker">More</Link>
        </div>
      </div>
    </section>
  );
};

export default ThemeBand;
