import { useRouter } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import DashboardItem from "~/components/dashboards/dashboard-item";
import DashboardItemForm from "../components/dashboards/dashboard-item-form";
import { TDashboardItem } from "../types/dashboard";
type DashConfig = Array<TDashboardItem>;

const DashboardConfigurator = () => {
  const [dashConfig, setDashConfig] = useState<DashConfig>([]);

  const addItem = (newItem: TDashboardItem) => {
    setDashConfig([...dashConfig, newItem]);
  };

  return (
    <View className="p-2">
      <View className="flex flex-row flex-wrap justify-between mb-2">
        {dashConfig.map((item) => (
          <View key={item.name} className="w-[49%]">
            <DashboardItem isEditable={false} dashItem={item} />
          </View>
        ))}
      </View>
      <DashboardItemForm addItem={addItem} />
    </View>
  );
};

export default DashboardConfigurator;
