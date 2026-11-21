import { create } from "zustand";
import { persist } from "zustand/middleware";
import { applyTheme } from "../lib/theme";

const DEFAULTS = {
  accent: "blue",
  customAccent: "#3b82f6",
  surface: "navy",
  glow: true,
  motion: true,
};

export const useThemeStore = create(
  persist(
    (set) => ({
      ...DEFAULTS,
      setAccent: (accent) => set({ accent }),
      setCustomAccent: (customAccent) => set({ accent: "custom", customAccent }),
      setSurface: (surface) => set({ surface }),
      setGlow: (glow) => set({ glow }),
      setMotion: (motion) => set({ motion }),
      reset: () => set({ ...DEFAULTS }),
    }),
    {
      name: "sfs-theme",
      onRehydrateStorage: () => (state) => state && applyTheme(state),
    }
  )
);

// Keep the DOM in sync with the store (also covers first load without storage).
applyTheme(useThemeStore.getState());
useThemeStore.subscribe(applyTheme);
