import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { secureStorage } from "./secure-storage";

type DashboardStore = {
  dashboards: Array<{ name: string; urlBase: string; apiKey: string }>;
  addDashboard: (dashboard: {
    name: string;
    urlBase: string;
    apiKey: string;
  }) => void;
  clearDashboards: () => void;
};

const useDashboardsStore = create(
  persist<DashboardStore>(
    (set) => ({
      dashboards: [],
      addDashboard: (dashboard: {
        name: string;
        urlBase: string;
        apiKey: string;
      }) => set((state) => ({ dashboards: [...state.dashboards, dashboard] })),
      clearDashboards: () => set({ dashboards: [] }),
    }),
    {
      name: "dashboards",
      storage: createJSONStorage(() => secureStorage),
    }
  )
);

export default useDashboardsStore;
