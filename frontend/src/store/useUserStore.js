// store/useUserStore.js
import { create } from "zustand";

const useUserStore = create((set) => ({
  user: null, // { name, role }
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));

export default useUserStore;
