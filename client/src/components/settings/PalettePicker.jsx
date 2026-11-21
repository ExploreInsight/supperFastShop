import { Check } from "lucide-react";
import { PALETTES, resolvePalette } from "../../lib/theme";
import { useThemeStore } from "../../stores/useThemeStore";
import Section from "./Section";

const Swatch = ({ p, active, onPick }) => (
  <button
    onClick={onPick}
    aria-pressed={active}
    className={`text-left rounded-md overflow-hidden border-2 transition-transform hover:-translate-y-0.5 ${active ? "border-ink" : "border-ink/25"}`}
  >
    <span className="block h-16 relative" style={{ background: p.field }}>
      <span className="absolute left-3 bottom-2 sticker px-2 py-1 text-lg" style={{ background: p.sticker, color: p.onSticker }}>$48</span>
      <span className="absolute right-3 top-3 font-display font-black text-2xl uppercase leading-none" style={{ color: p.onField }}>Aa</span>
    </span>
    <span className="flex items-center justify-between px-3 py-2 font-bold text-sm bg-white/60">
      {p.name}
      {active && <Check size={16} aria-label="Selected" />}
    </span>
  </button>
);

const PalettePicker = () => {
  const t = useThemeStore();
  const custom = resolvePalette({ palette: "custom", customField: t.customField });
  return (
    <Section title="Colour" hint="Sets the field colour. Text and stickers adjust so everything stays readable.">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {PALETTES.map((p) => (
          <Swatch key={p.id} p={p} active={t.palette === p.id} onPick={() => t.setPalette(p.id)} />
        ))}
        <div className={`relative rounded-md overflow-hidden border-2 ${t.palette === "custom" ? "border-ink" : "border-ink/25"}`}>
          <span className="block h-16" style={{ background: t.palette === "custom" ? custom.field : "conic-gradient(red, yellow, lime, aqua, blue, magenta, red)" }} />
          <label className="flex items-center justify-between px-3 py-2 font-bold text-sm bg-white/60 cursor-pointer">
            Custom
            <input type="color" aria-label="Custom field colour" value={t.customField} onChange={(e) => t.setCustomField(e.target.value)} className="w-7 h-7 rounded border-0 bg-transparent cursor-pointer" />
          </label>
        </div>
      </div>
    </Section>
  );
};

export default PalettePicker;
