import { create } from "zustand"

interface UserStore {
  currentUserEmail: string | undefined;
  setCurrentUserEmail: (email: string) => void;
}

export const useSelectStore = create<UserStore>((set) => ({
  currentUserEmail: undefined,
  setCurrentUserEmail: (email) =>  set({currentUserEmail: email}),
}))