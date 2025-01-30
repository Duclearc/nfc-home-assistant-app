import { useState } from "react";
import { ScrollView, View } from "react-native";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import TagCard, { Tag } from "../../components/tag-config/tag";
import { Plus } from "~/lib/icons/lucide";
import { useRouter } from "expo-router";
import useDashboardsStore from "../../stores/dashboards";

export default function TagConfigScreen() {
  const router = useRouter();
  const { dashboards, clearDashboards } = useDashboardsStore();

  return (
    <ScrollView className="flex flex-1 h-full">
      <View className="p-4">
        <Text className="text-2xl font-bold mb-2">
          Configure dashboard tags
        </Text>
        {dashboards.map((dashboard) => (
          <View
            key={dashboard.name}
            className="w-full p-2 m-2 border border-slate-700 rounded-md"
          >
            <Text>{dashboard.name}</Text>
          </View>
          // <TagCard
          //   key={dashboard.id}
          //   tag={dashboard}
          //   updateTag={updateTag}
          //   removeTag={removeTag}
          // />
        ))}
        <Button
          onPress={() => router.navigate("/dashboard-configurator")}
          className="w-full"
        >
          <Text>
            <Plus className="mr-2 h-4 w-4" /> Configure new dashboard tag
          </Text>
        </Button>

        <Button
          variant="outline"
          className="my-3"
          onPress={() => clearDashboards()}
        >
          <Text>[debug] Clear dashboards</Text>
        </Button>
      </View>
    </ScrollView>
  );
}
