import { useThemeStore } from "../../stores/useThemeStore";
import Section from "./Section";
import Toggle from "./Toggle";

const EffectsToggles = () => {
  const { texture, setTexture, motion, setMotion } = useThemeStore();
  return (
    <Section title="Effects">
      <div className="space-y-3">
        <Toggle label="Print grain" hint="A faint ink texture over the field colour" checked={texture} onChange={setTexture} />
        <Toggle label="Animations" hint="Swinging tags and the scrolling tape. Off is calmer." checked={motion} onChange={setMotion} />
      </div>
    </Section>
  );
};

export default EffectsToggles;
