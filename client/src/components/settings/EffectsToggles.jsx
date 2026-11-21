import { Sparkles, Zap } from "lucide-react";
import { useThemeStore } from "../../stores/useThemeStore";
import Section from "./Section";
import Toggle from "./Toggle";

const EffectsToggles = () => {
  const { glow, setGlow, motion, setMotion } = useThemeStore();

  return (
    <Section title="Effects">
      <div className="space-y-3">
        <Toggle
          icon={Sparkles}
          label="Background glow"
          hint="Soft accent-colored gradient behind the page"
          checked={glow}
          onChange={setGlow}
        />
        <Toggle
          icon={Zap}
          label="Animations"
          hint="Turn off for a snappier, calmer UI"
          checked={motion}
          onChange={setMotion}
        />
      </div>
    </Section>
  );
};

export default EffectsToggles;
