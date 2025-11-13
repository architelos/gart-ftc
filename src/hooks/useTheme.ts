import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ThemeState {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

const useTheme = create<ThemeState>()(
  persist(
    (set) => ({
      theme: "light",
      toggleTheme: () =>
        set((state) => {
          const next = state.theme === "light" ? "dark" : "light";
          if (next === "light") document.documentElement.setAttribute("data-theme", "light");
          else document.documentElement.removeAttribute("data-theme");

          return { theme: next }
        }),
    }),
    {
      name: "theme",
      onRehydrateStorage: () => (state) => {
        if (state?.theme === "light") document.documentElement.setAttribute("data-theme", "light");
        else document.documentElement.removeAttribute("data-theme");
      }
    }
  )
);

export default useTheme;
