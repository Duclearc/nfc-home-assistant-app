import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { secureStorage } from "./secure-storage";

type HomeAssistantStore = {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  devices: Array<any>;
  setDevices: (devices: Array<any>) => void;
};

const useHomeAssistantStore = create<HomeAssistantStore>((set) => ({
  isLoading: false,
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
  devices: [],
  setDevices: (devices: Array<any>) => set({ devices }),
}));

export default useHomeAssistantStore;
