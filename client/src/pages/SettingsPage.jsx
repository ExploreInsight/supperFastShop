import { RotateCcw } from "lucide-react";
import { useThemeStore } from "../stores/useThemeStore";
import AccentPicker from "../components/settings/AccentPicker";
import SurfacePicker from "../components/settings/SurfacePicker";
import EffectsToggles from "../components/settings/EffectsToggles";
import ThemePreview from "../components/settings/ThemePreview";

const SettingsPage = () => {
  const reset = useThemeStore((s) => s.reset);

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent py-1">
          Settings
        </h1>
        <button
          onClick={reset}
          className="flex items-center gap-2 px-3 py-2 rounded-md border border-gray-700 bg-gray-800 text-gray-300 hover:text-white hover:bg-gray-700 transition-colors"
        >
          <RotateCcw size={16} /> Reset
        </button>
      </div>

      <AccentPicker />
      <SurfacePicker />
      <EffectsToggles />
      <ThemePreview />

      <p className="text-sm text-gray-500">
        Settings are saved in this browser only.
      </p>
    </div>
  );
};

export default SettingsPage;
