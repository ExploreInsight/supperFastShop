import { Check } from "lucide-react";
import { ACCENTS, resolveAccentHex } from "../../lib/theme";
import { useThemeStore } from "../../stores/useThemeStore";
import Section from "./Section";

const AccentPicker = () => {
  const t = useThemeStore();

  return (
    <Section title="Accent color">
      <div className="flex flex-wrap gap-3">
        {ACCENTS.map((a) => {
          const active = t.accent === a.id;
          return (
            <button
              key={a.id}
              onClick={() => t.setAccent(a.id)}
              title={a.name}
              aria-label={a.name}
              aria-pressed={active}
              style={{ backgroundColor: a.hex }}
              className={`w-10 h-10 rounded-full flex items-center justify-center ring-offset-2 ring-offset-gray-900 transition-transform hover:scale-110 ${
                active ? "ring-2 ring-white" : ""
              }`}
            >
              {active && <Check size={18} className="text-white" />}
            </button>
          );
        })}
        <label
          title="Custom color"
          className={`relative w-10 h-10 rounded-full overflow-hidden cursor-pointer ring-offset-2 ring-offset-gray-900 hover:scale-110 transition-transform ${
            t.accent === "custom" ? "ring-2 ring-white" : ""
          }`}
          style={{
            background:
              "conic-gradient(red, yellow, lime, aqua, blue, magenta, red)",
          }}
        >
          <input
            type="color"
            aria-label="Custom accent color"
            value={t.customAccent}
            onChange={(e) => t.setCustomAccent(e.target.value)}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
        </label>
      </div>
      <p className="mt-3 text-sm text-gray-400">
        Current:{" "}
        <span className="font-mono text-blue-300">{resolveAccentHex(t)}</span>
      </p>
    </Section>
  );
};

export default AccentPicker;
