import { create } from "zustand";
import { TypeSystemsCategories } from "../Types/SystemsType";
import { createJSONStorage, persist } from "zustand/middleware";

export interface AppConfigStore {
  system_categories: TypeSystemsCategories[];
  set_system_categories: (arr_system_category: TypeSystemsCategories[]) => void;
  add_system_categories: (system_category: TypeSystemsCategories) => void;
}

export const useAppConfigStore = create(
  persist<AppConfigStore>(
    (set) => ({
      system_categories: [],
      set_system_categories: (arr_system_category: TypeSystemsCategories[]) =>
        set(() => ({
          system_categories: arr_system_category,
        })),
      add_system_categories: (system_category: TypeSystemsCategories) =>
        set((state) => ({
          system_categories: [...state.system_categories, system_category],
        })),
    }),
    {
      name: "estimator-app-config",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
