import { create } from "zustand";

export const useUIStore = create((set) => ({
  isSidebarOpen: true,
  isLoadingOverlay: false,
  theme: "light",

  toggleSidebar: () =>
    set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),

  setLoadingOverlay: (value) =>
    set({ isLoadingOverlay: value }),

  setTheme: (theme) => set({ theme }),
}));

// Interview point

// “Why separate UI store from data store?”
// Because UI state changes more often and shouldn’t re-render data-heavy components.