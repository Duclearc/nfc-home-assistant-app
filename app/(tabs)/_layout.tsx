import { Tabs } from "expo-router";
import TabBar from "~/components/tab-bar/TabBar";

export default function TabLayout() {
  return (
    <Tabs tabBar={(props) => <TabBar {...props} />}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="dashboards"
        options={{
          title: "Dashboards",
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="tag-config"
        options={{
          title: "Tags",
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
