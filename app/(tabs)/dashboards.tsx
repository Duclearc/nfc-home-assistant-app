import { Lightbulb } from "lucide-react-native";
import { FlatList, Text, View } from "react-native";
import DashCard from "~/components/dash-card";
import { STYLE } from "~/lib/constants";
import useDashboardsStore from "~/stores/dashboards";
import { getIcon } from "../../lib/icons/getIcon";

export default function Dashboards() {
  const { dashboards } = useDashboardsStore();
  return (
    <View className={"flex-1 p-2"}>
      <FlatList
        data={dashboards}
        contentContainerClassName="gap-3"
        renderItem={({ item: dashboard }) => (
          <View>
            <DashCard
              title={dashboard.name}
              description={dashboard.url_base}
              content={
                <FlatList
                  data={dashboard.items}
                  keyExtractor={(item) => item.entity}
                  renderItem={({ item }) => (
                    <View className="flex-row gap-2 my-1">
                      {getIcon(item.entity)}
                      <Text className="text-lg">{item.name}</Text>
                    </View>
                  )}
                />
              }
            />
          </View>
        )}
        className="mt-5 flex-1"
        ListEmptyComponent={
          <View className="rounded-xl p-5 mb-8">
            <Text className="px-2 font-bold text-xl text-center">
              No dashboards
            </Text>
            <Text className="px-2 text-center">
              Scan a tag to add a new dashboard
            </Text>
          </View>
        }
      />
    </View>
  );
}
