import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type dataState = {
  data?: Object;
  setData: (data?: Object) => void;
  isScanning: boolean;
  setIsScanning: (isScanning: boolean) => void;
};

export const useDataStore = create(
  persist<dataState>(
    (set) => ({
      setData: (data) => {
        set((state) => ({ ...state, data }));
      },
      isScanning: false,
      setIsScanning: (isScanning) => {
        set((state) => ({ ...state, isScanning }));
      },
    }),
    {
      name: "haydan-data-store",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
