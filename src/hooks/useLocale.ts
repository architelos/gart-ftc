import { create } from "zustand";
import { persist } from "zustand/middleware";

interface LocaleState {
  locale: "en" | "vn";
  toggleLocale: () => void;
}

const useLocale = create<LocaleState>()(
  persist(
    (set) => ({
      locale: "en",
      toggleLocale: () =>
        set((state) => ({
          locale: state.locale === "en" ? "vn" : "en",
        })),
    }),
    {
      name: "locale"
    }
  )
);

export default useLocale;
