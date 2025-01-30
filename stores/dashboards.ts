import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { secureStorage } from "./secure-storage";

type DashboardStore = {
  dashboards: Array<{ name: string }>;
  addDashboard: (dashboard: { name: string }) => void;
};

const useDashboardsStore = create(
  persist<DashboardStore>(
    (set) => ({
      dashboards: [],
      addDashboard: (dashboard: { name: string }) =>
        set((state) => ({ dashboards: [...state.dashboards, dashboard] })),
    }),
    {
      name: "dashboards",
      storage: createJSONStorage(() => secureStorage),
    }
  )
);

export default useDashboardsStore;
