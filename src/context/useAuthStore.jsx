import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set, get) => ({
      accessToken: null,
      refreshToken: null,
      role: null,

      login: ({ accessToken, refreshToken, role }) => {
        set({ accessToken, refreshToken, role });
      },

      logout: () => {
        set({ accessToken: null, refreshToken: null, role: null });
      }
    }),
    {
      name: "auth-storage", // unique name for the storage
    }

  )
);

export default useAuthStore;