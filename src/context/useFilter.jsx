import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
const context = (set) => ({
  category: null,
  setCategory: (data) => set((state) => ({ ...state, category: data })),
  resetCategory: () => set((state) => ({ ...state, category: null })),
});
const config = {
  name: "filters",
  storage: createJSONStorage(() => localStorage),
};
const useFilter = create(persist(context, config));

export default useFilter;
