import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
const context = (set) => ({
  keyword: null,
  search: (word) => set({ keyword: word }),
  reset: () => set({ keyword: null }),
});
const config = {
  name: "search",
  storage: createJSONStorage(() => localStorage),
};
const useSearch = create(persist(context, config));

export default useSearch;
