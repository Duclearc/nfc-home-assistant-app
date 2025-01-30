import { toByteArray } from "base64-js";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import { Text } from "~/components/ui/text";
import { SmartphoneNfc } from "~/lib/icons/lucide";
import { dashboard as DashboardProto } from "~/proto/gen/dashboard";
import useDashboardsStore from "~/stores/dashboards";
import { useDataStore } from "~/stores/data";
import { Dashboard } from "~/types/dashboard";
import DashboardItem from "~/components/dashboards/dashboard-item";
import { triggerService } from "../../lib/home-assistant/client";
import { toast } from "sonner-native";

const ScanView = () => (
  <View className="h-full flex-1 items-center justify-center">
    <View className="items-center justify-center">
      <View className="w-32 h-32 rounded-full bg-muted items-center justify-center mb-4 border border-muted-foreground">
        <SmartphoneNfc size={72} className="text-muted-foreground" />
      </View>
      <Text className="text-center text-lg">
        Scan a dashboard tag to open the dashboard
      </Text>
    </View>
  </View>
);

export default function HomeScreen() {
  const [currentDash, setCurrentDash] = useState<Dashboard>();
  // TAG URL → haydan:///?query=hello&query2=world
  const { query } = useLocalSearchParams(); // { query: "hello", query2: "world" }

  const { isScanning, setIsScanning } = useDataStore();
  const { addDashboard } = useDashboardsStore();

  const runWhenTabOpens = () => {
    console.log("Running when tab opens! ", query);
    setIsScanning(true);

    if (!query) return setIsScanning(false);

    const byteArray = toByteArray(query as string);
    const dashboardProtoData =
      DashboardProto.Dashboard.deserializeBinary(byteArray);
    const dashboardData = dashboardProtoData.toObject();

    const dashboard: Dashboard = {
      url_base: dashboardData.url_base!,
      api_key: dashboardData.api_key!,
      name: dashboardData.name!,
      items: dashboardData.items!.map((i) => ({
        name: i.name!,
        entity: i.entity!,
      })),
    };

    addDashboard(dashboard);
    setCurrentDash(dashboard);
  };

  useEffect(() => {
    if (currentDash) setIsScanning(false);
  }, [currentDash]);

  // this is what makes the `runWhenTabOpens` function run whenever this tab "opens" (regardless of how you get here, e.g. user press, tag navigation, whatever)
  const navigation = useNavigation();
  useEffect(
    () => navigation.addListener("state", runWhenTabOpens),
    [navigation]
  );

  return (
    <SafeAreaView className="flex-1 py-10 px-5">
      <ScrollView className="flex-1">
        {isScanning ? <ActivityIndicator /> : null}
        {!currentDash ? (
          <ScanView />
        ) : (
          <View>
            <Text className="text-3xl font-light">{currentDash.name}</Text>
            <Separator className="my-2" />
            {currentDash.items.map((item) => (
              <Pressable
                key={item.entity}
                onPress={async () => {
                  const success = await triggerService(
                    currentDash.url_base,
                    currentDash.api_key,
                    "turn_on",
                    item.entity
                  );
                  if (success) {
                    toast.success("Service triggered successfully");
                  } else {
                    toast.error("Failed to trigger service");
                  }
                }}
              >
                <DashboardItem dashItem={item} />
              </Pressable>
            ))}
          </View>
        )}
        <Button
          className="my-2 items-center justify-center"
          variant="outline"
          children={<Text>Clear</Text>}
          onPress={() => {
            setCurrentDash(undefined);
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
