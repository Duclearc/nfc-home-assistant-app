import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type dataState = {
  data?: string;
  setData: (data: string) => void;
};

export const useDataStore = create(
  persist<dataState>(
    (set) => ({
      setData: (data) => {
        set((state) => ({ ...state, data }));
      },
    }),
    {
      name: "haydan-data-store",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
