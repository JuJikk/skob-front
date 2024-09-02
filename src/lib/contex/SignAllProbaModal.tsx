import { create } from "zustand";

interface ModalStore {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  refetchData: () => void;
  setRefetchData: (refetch: () => void) => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
  refetchData: () => {},
  setRefetchData: (refetch) => set({ refetchData: refetch }),
}));
