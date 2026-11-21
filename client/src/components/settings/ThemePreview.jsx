import { Palette } from "lucide-react";
import Section from "./Section";

const ThemePreview = () => (
  <Section title="Preview">
    <div className="flex flex-wrap items-center gap-3">
      <button className="px-4 py-2 rounded-md bg-gradient-to-br from-blue-600 to-blue-800 hover:from-blue-500 hover:to-blue-700 font-medium transition-colors flex items-center gap-2">
        <Palette size={16} /> Primary button
      </button>
      <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-sm border border-blue-500/40">
        Badge
      </span>
      <span className="text-blue-400">Link text</span>
    </div>
  </Section>
);

export default ThemePreview;
