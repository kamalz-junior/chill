import { create } from "zustand";

export const useUser = create((set) => ({
  user: JSON.parse(localStorage.getItem("user")) || null,
  setUser: (nextUser) => {
    localStorage.setItem("user", JSON.stringify(nextUser));
    set({ user: nextUser });
  },
}));
