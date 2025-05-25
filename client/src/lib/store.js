import { create } from "zustand";

export const useUser = create((set) => ({
  user:
    typeof window !== undefined
    ? JSON.parse(localStorage.getItem("user"))
    : null,
  setUser: (nextUser) => {
    if(typeof window !== undefined) {
      localStorage.setItem("user", JSON.stringify(nextUser));
    }
    set({ user: nextUser });
  },
}));
