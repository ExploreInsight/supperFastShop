export const ACCENTS = [
  { id: "blue", name: "Blue", hex: "#3b82f6" },
  { id: "emerald", name: "Emerald", hex: "#10b981" },
  { id: "violet", name: "Violet", hex: "#8b5cf6" },
  { id: "rose", name: "Rose", hex: "#f43f5e" },
  { id: "amber", name: "Amber", hex: "#f59e0b" },
  { id: "cyan", name: "Cyan", hex: "#06b6d4" },
  { id: "orange", name: "Orange", hex: "#f97316" },
  { id: "pink", name: "Pink", hex: "#ec4899" },
];

// Each surface re-maps the gray scale (and page/card backgrounds).
export const SURFACES = [
  { id: "navy", name: "Navy", app: "#101b38", card: "#0f172a", gray: null },
  {
    id: "slate",
    name: "Slate",
    app: "#0f172a",
    card: "#0b1220",
    gray: { 950: "#020617", 900: "#0f172a", 800: "#1e293b", 700: "#334155" },
  },
  {
    id: "midnight",
    name: "Midnight",
    app: "#050505",
    card: "#0a0a0a",
    gray: { 950: "#000000", 900: "#0a0a0a", 800: "#171717", 700: "#262626" },
  },
  {
    id: "plum",
    name: "Plum",
    app: "#1a1030",
    card: "#150d28",
    gray: { 950: "#0d0718", 900: "#1a1030", 800: "#2a1b4a", 700: "#3d2a66" },
  },
];

// shade -> [% of accent, mix target]
const SHADES = {
  50: [10, "white"],
  100: [20, "white"],
  200: [40, "white"],
  300: [60, "white"],
  400: [80, "white"],
  500: [100, "white"],
  600: [85, "black"],
  700: [70, "black"],
  800: [55, "black"],
  900: [40, "black"],
  950: [25, "black"],
};

export const resolveAccentHex = ({ accent, customAccent }) =>
  accent === "custom"
    ? customAccent
    : ACCENTS.find((a) => a.id === accent)?.hex ?? ACCENTS[0].hex;

export function applyTheme(s) {
  const root = document.documentElement;
  const style = root.style;

  // Accent: override Tailwind's blue-* scale, which the whole app uses.
  const isDefaultAccent = s.accent === "blue";
  Object.entries(SHADES).forEach(([shade, [pct, target]]) => {
    const prop = `--color-blue-${shade}`;
    if (isDefaultAccent) style.removeProperty(prop);
    else
      style.setProperty(
        prop,
        `color-mix(in oklab, ${resolveAccentHex(s)} ${pct}%, ${target})`
      );
  });

  // Surface
  const surface = SURFACES.find((x) => x.id === s.surface) ?? SURFACES[0];
  style.setProperty("--app-bg", surface.app);
  style.setProperty("--app-card", surface.card);
  [950, 900, 800, 700].forEach((n) => {
    const prop = `--color-gray-${n}`;
    if (surface.gray) style.setProperty(prop, surface.gray[n]);
    else style.removeProperty(prop);
  });

  root.dataset.motion = s.motion ? "full" : "reduced";
}

