import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { Dashboard } from "~/types/dashboard";
import { secureStorage } from "./secure-storage";

type DashboardStore = {
  dashboards: Array<Dashboard>;
  addDashboard: (dashboard: Dashboard) => void;
  clearDashboards: () => void;
};

const useDashboardsStore = create(
  persist<DashboardStore>(
    (set) => ({
      dashboards: [],
      addDashboard: (dashboard) =>
        set((state) => ({
          dashboards: state.dashboards.find((d) => d.name === dashboard.name)
            ? state.dashboards.map((d) =>
                d.name === dashboard.name ? dashboard : d
              )
            : [...state.dashboards, dashboard],
        })),
      clearDashboards: () => set({ dashboards: [] }),
    }),
    {
      name: "dashboards",
      storage: createJSONStorage(() => secureStorage),
    }
  )
);

export default useDashboardsStore;
