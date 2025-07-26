import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set, get) => ({
      accessToken: null,
      refreshToken: null,
      role: null,
      roleId: null,
      hospitalId: null,

      login: ({ accessToken, refreshToken, role, roleId, hospitalId }) => {
        set({ accessToken, refreshToken, role, roleId, hospitalId });
      },

      logout: () => {
        set({
          accessToken: null,
          refreshToken: null,
          role: null,
          roleId: null,
          hospitalId: null
        });

        try {
          window.localStorage.removeItem("auth-storage");
        } catch (_) { }
      }
    }),
    {
      name: "auth-storage",
    }

  )
);

export default useAuthStore;