// Palettes recolor the whole shop through CSS variables (see index.css).
export const INK = "#0b0b0b";
export const PAPER = "#f7f4ec";
export const ACID = "#d7ff3a";
export const SIGNAL = "#ff4d00";

export const PALETTES = [
  { id: "signal", name: "Signal Orange", field: SIGNAL, onField: INK, sticker: ACID, onSticker: INK },
  { id: "acid", name: "Acid Yellow", field: ACID, onField: INK, sticker: SIGNAL, onSticker: INK },
  { id: "drop", name: "Drop Red", field: "#e63312", onField: "#ffffff", sticker: ACID, onSticker: INK },
  { id: "cobalt", name: "Cobalt Blue", field: "#2340ff", onField: "#ffffff", sticker: ACID, onSticker: INK },
  { id: "cyber", name: "Cyber Lime", field: "#00e676", onField: INK, sticker: SIGNAL, onSticker: INK },
  { id: "violet", name: "Hyper Violet", field: "#7c3aed", onField: "#ffffff", sticker: ACID, onSticker: INK },
  { id: "bubble", name: "Bubble Pink", field: "#ff5fa2", onField: INK, sticker: ACID, onSticker: INK },
  { id: "concrete", name: "Concrete", field: "#334155", onField: "#ffffff", sticker: ACID, onSticker: INK },
  { id: "raw", name: "Raw Canvas", field: "#eae4d8", onField: INK, sticker: SIGNAL, onSticker: INK },
  { id: "ink", name: "Ink Black", field: INK, onField: PAPER, sticker: SIGNAL, onSticker: INK },
];

const channel = (v) => {
  const c = v / 255;
  return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
};

export function luminance(hex) {
  const n = parseInt(hex.slice(1), 16);
  return 0.2126 * channel((n >> 16) & 255) + 0.7152 * channel((n >> 8) & 255) + 0.0722 * channel(n & 255);
}

// Readable text colour for any custom field colour.
export const readableOn = (hex) => (luminance(hex) > 0.28 ? INK : "#ffffff");

export function resolvePalette({ palette, customField }) {
  if (palette === "custom") {
    const light = luminance(customField) > 0.28;
    return {
      id: "custom",
      name: "Custom",
      field: customField,
      onField: readableOn(customField),
      sticker: light ? SIGNAL : ACID,
      onSticker: INK,
    };
  }
  return PALETTES.find((p) => p.id === palette) ?? PALETTES[0];
}

export function applyTheme(s) {
  const p = resolvePalette(s);
  const root = document.documentElement;
  root.style.setProperty("--field", p.field);
  root.style.setProperty("--on-field", p.onField);
  root.style.setProperty("--sticker", p.sticker);
  root.style.setProperty("--on-sticker", p.onSticker);
  root.dataset.motion = s.motion ? "full" : "reduced";
  root.dataset.texture = s.texture ? "on" : "off";
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", p.field);
}
