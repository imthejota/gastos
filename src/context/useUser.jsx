import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
const context = (set) => ({
  user: null,
  login: (data) => set({ user: data }),
  logout: () => set({ user: null }),
});
const config = {
  name: "user",
  storage: createJSONStorage(() => localStorage),
};
const useUser = create(persist(context, config));

export default useUser;
