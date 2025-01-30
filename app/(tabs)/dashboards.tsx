import { AlarmClock, Lightbulb } from "lucide-react-native";
import { FlatList, Text, View } from "react-native";
import DashCard from "~/components/dash-card";
import { STYLE } from "~/lib/constants";
import useDashboardsStore from "~/stores/dashboards";

export default function Dashboards() {
  const { dashboards } = useDashboardsStore();
  return (
    <View className={STYLE.wrapper}>
      <Text className={`${STYLE.title} text-3xl`}>Dashboards</Text>
      <FlatList
        data={dashboards}
        contentContainerClassName="gap-3"
        renderItem={({ item }) => (
          <View>
            <DashCard
              title={item.name}
              description={item.url_base}
              content={
                <FlatList
                  data={item.items}
                  renderItem={({ item }) => (
                    <View className="flex-row justify-between my-2">
                      <View className="flex-row gap-2">
                        {item.icon === "lightbulb" ? (
                          <Lightbulb className="text-black" />
                        ) : (
                          <AlarmClock className="text-black" />
                        )}
                        <Text className="text-lg">{item.name}</Text>
                      </View>
                      <Text className="text-lg font-mono">{item.entity}</Text>
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
