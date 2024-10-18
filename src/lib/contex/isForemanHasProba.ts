import { create } from "zustand";

interface ModalStore {
  isHasProba: boolean;
  setHasProba: () => void;
}

export const useHasProbaStore = create<ModalStore>((set) => ({
  isHasProba: false,
  setHasProba: () => set({ isHasProba: true }),
}));
