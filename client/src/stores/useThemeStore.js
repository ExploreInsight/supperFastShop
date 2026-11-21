import { create } from "zustand";
import { persist } from "zustand/middleware";
import { applyTheme } from "../lib/theme";

const DEFAULTS = { palette: "signal", customField: "#ff4d00", texture: true, motion: true };

export const useThemeStore = create(
  persist(
    (set) => ({
      ...DEFAULTS,
      setPalette: (palette) => set({ palette }),
      setCustomField: (customField) => set({ palette: "custom", customField }),
      setTexture: (texture) => set({ texture }),
      setMotion: (motion) => set({ motion }),
      reset: () => set({ ...DEFAULTS }),
    }),
    {
      name: "sfs-theme-v2",
      onRehydrateStorage: () => (state) => state && applyTheme(state),
    }
  )
);

applyTheme(useThemeStore.getState());
useThemeStore.subscribe(applyTheme);
