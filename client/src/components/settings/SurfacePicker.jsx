import { Check } from "lucide-react";
import { SURFACES } from "../../lib/theme";
import { useThemeStore } from "../../stores/useThemeStore";
import Section from "./Section";

const SurfacePicker = () => {
  const { surface, setSurface } = useThemeStore();

  return (
    <Section title="Background">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {SURFACES.map((s) => {
          const active = surface === s.id;
          return (
            <button
              key={s.id}
              onClick={() => setSurface(s.id)}
              aria-pressed={active}
              className={`rounded-lg border p-2 text-left transition-colors ${
                active ? "border-blue-400" : "border-gray-700 hover:border-gray-500"
              }`}
            >
              <span
                className="block h-12 rounded-md mb-2"
                style={{
                  background: `linear-gradient(135deg, ${s.app}, ${s.card})`,
                  border: "1px solid rgba(255,255,255,0.12)",
                }}
              />
              <span className="flex items-center justify-between text-sm">
                {s.name}
                {active && <Check size={14} className="text-blue-400" />}
              </span>
            </button>
          );
        })}
      </div>
    </Section>
  );
};

export default SurfacePicker;
