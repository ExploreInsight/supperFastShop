import { RotateCcw } from "lucide-react";
import { useThemeStore } from "../stores/useThemeStore";
import PalettePicker from "../components/settings/PalettePicker";
import EffectsToggles from "../components/settings/EffectsToggles";
import Btn from "../components/ui/Btn";

const SettingsPage = () => {
  const reset = useThemeStore((s) => s.reset);
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 pt-8">
      <div className="flex items-end justify-between gap-4">
        <h1 className="text-6xl sm:text-8xl">Settings</h1>
        <Btn variant="field" onClick={reset}><RotateCcw size={16} /> Reset</Btn>
      </div>
      <div className="mt-8 space-y-8">
        <PalettePicker />
        <EffectsToggles />
      </div>
      <p className="mt-6 font-label text-xs">Saved in this browser only.</p>
    </div>
  );
};

export default SettingsPage;
