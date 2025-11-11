import { create } from "zustand";

interface MenuState {
    footerVisible: boolean;
    menuOpen: boolean;
    setFooterVisible: (val: boolean) => void;
    setMenuOpen: (val: boolean) => void;
    reset: () => void;
}

const useMenuState = create<MenuState>((set) => ({
    footerVisible: false,
    menuOpen: false,

    setFooterVisible: (val: boolean) => set({ footerVisible: val }),
    setMenuOpen: (val: boolean) => set({ menuOpen: val }),

    reset: () => set({ footerVisible: false, menuOpen: false }),
}));

export default useMenuState;
