import { ScrollView, View } from "react-native";
import { TagReader } from "~/components/TagReader";
import { Text } from "~/components/ui/text";
import useDashboardsStore from "~/stores/dashboards";
import { useDataStore } from "~/stores/data";

export default function TagConfigScreen() {
  const dataStore = useDataStore();
  const dashboardStore = useDashboardsStore();
  return (
    <View style={{ padding: 10, flex: 1 }}>
      <ScrollView>
        <TagReader />
        {!dataStore.isScanning ? (
          <Text style={{ color: "black", fontSize: 20 }}>
            {JSON.stringify(dashboardStore.dashboards)}
          </Text>
        ) : null}
      </ScrollView>
    </View>
  );
}
