import { create } from "zustand";

type HomeAssistantStore = {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  devices: Array<{ deviceId: string; entities: string[]; name: string }>;
  setDevices: (devices: Array<any>) => void;
};

const useHomeAssistantStore = create<HomeAssistantStore>((set) => ({
  isLoading: false,
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
  devices: [],
  setDevices: (devices: Array<any>) => set({ devices }),
}));

export default useHomeAssistantStore;
