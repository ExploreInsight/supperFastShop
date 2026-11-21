import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useWishlistStore = create(
  persist(
    (set, get) => ({
      items: [],
      has: (id) => get().items.some((p) => p._id === id),
      toggle: (product) =>
        set((s) =>
          s.items.some((p) => p._id === product._id)
            ? { items: s.items.filter((p) => p._id !== product._id) }
            : { items: [...s.items, product] }
        ),
      clear: () => set({ items: [] }),
    }),
    { name: "sfs-wishlist" }
  )
);
