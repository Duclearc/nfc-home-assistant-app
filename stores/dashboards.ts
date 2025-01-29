import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { TDashboardItem } from "../types/dashboard";
import { secureStorage } from "./secure-storage";

type DashboardStore = {
  dashboards: Array<{ name: string; items: Array<TDashboardItem> }>;
  addDashboard: (dashboard: {
    name: string;
    items: Array<TDashboardItem>;
  }) => void;
};

const useDashboardsStore = create(
  persist<DashboardStore>(
    (set) => ({
      dashboards: [],
      addDashboard: (dashboard: {
        name: string;
        items: Array<TDashboardItem>;
      }) => set((state) => ({ dashboards: [...state.dashboards, dashboard] })),
    }),
    {
      name: "dashboards",
      storage: createJSONStorage(() => secureStorage),
    }
  )
);

export default useDashboardsStore;
