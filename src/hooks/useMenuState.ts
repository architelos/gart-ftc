import { create } from "zustand";

interface MenuState {
  footerVisible: boolean;
  open: boolean;
  setFooterVisible: (val: boolean) => void;
  setOpen: (val: boolean) => void;
  reset: () => void;
}

const useMenuState = create<MenuState>((set) => ({
  footerVisible: false,
  open: false,

  setFooterVisible: (val: boolean) => set({ footerVisible: val }),
  setOpen: (val: boolean) => set({ open: val }),

  reset: () => set({ footerVisible: false, open: false }),
}));

export default useMenuState;
