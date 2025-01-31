import { toByteArray } from "base64-js";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { toast } from "sonner-native";
import DashboardItem from "~/components/dashboards/dashboard-item";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import { Text } from "~/components/ui/text";
import { SmartphoneNfc } from "~/lib/icons/lucide";
import { dashboard as DashboardProto } from "~/proto/gen/dashboard";
import { useDataStore } from "~/stores/data";
import { Dashboard } from "~/types/dashboard";
import { triggerService } from "~/lib/home-assistant/client";
import { createWebsocket } from "~/lib/home-assistant/websockets";
const ScanView = () => (
  <View className="flex-1 items-center justify-center">
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

createWebsocket();

export default function HomeScreen() {
  const [currentDash, setCurrentDash] = useState<Dashboard>();
  const [isServiceLoading, setServiceLoading] = useState("");
  const { query } = useLocalSearchParams(); // TAG URL → haydan:///?query=[encoded-dashboard-data]

  const { isScanning, setIsScanning } = useDataStore();

  useEffect(() => {
    runWhenTabOpens();
  }, [query]);

  const runWhenTabOpens = async () => {
    setIsScanning(true);
    // console.log("Running when tab opens! ", query);

    if (!query) {
      console.error("No query found!");
      setCurrentDash(undefined);
      return setIsScanning(false);
    }

    const byteArray = toByteArray(query as string);
    const dashboardProtoData =
      DashboardProto.Dashboard.deserializeBinary(byteArray);
    const dashboardData = dashboardProtoData.toObject();

    // console.log("Dashboard data: ", JSON.stringify(dashboardData, null, 2));

    const dashboard: Dashboard = {
      url_base: dashboardData.url_base!,
      api_key: dashboardData.api_key!,
      name: dashboardData.name!,
      items: dashboardData.items!.map((i) => ({
        name: i.name!,
        entity: i.entity!,
      })),
    };
    setCurrentDash(dashboard);
  };

  useEffect(() => {
    if (currentDash) setIsScanning(false);
  }, [currentDash]);

  // this is what makes the `runWhenTabOpens` function run whenever this tab "opens" (regardless of how you get here, e.g. user press, tag navigation, whatever)
  // const navigation = useNavigation();
  // useEffect(
  //   () => navigation.addListener("state", runWhenTabOpens),
  //   [navigation]
  // );

  return (
    <SafeAreaView className="flex-1 pt-10 px-5 flex-col justify-between">
      {/* <Text>Query: {query}</Text> */}
      {isScanning ? <ActivityIndicator /> : null}
      {!currentDash ? (
        <ScanView />
      ) : (
        <View>
          <Text className="text-3xl font-light">{currentDash.name}</Text>
          <Separator className="my-2" />
          <ScrollView>
            {currentDash.items.map((item) => (
              <Pressable
                key={item.entity}
                onPress={async () => {
                  setServiceLoading(item.entity);
                  const success = await triggerService(
                    currentDash.url_base,
                    currentDash.api_key,
                    item.entity
                  );
                  if (success) {
                    toast.success("Service triggered successfully");
                  } else {
                    toast.error("Failed to trigger service");
                  }
                  setServiceLoading("");
                }}
                className="my-1"
              >
                <DashboardItem
                  dashItem={item}
                  isLoading={isServiceLoading === item.entity}
                />
              </Pressable>
            ))}
          </ScrollView>
        </View>
      )}
      {currentDash ? (
        <Button
          className="items-center justify-center"
          variant="outline"
          children={<Text>Clear dashboard</Text>}
          onPress={() => {
            setCurrentDash(undefined);
          }}
        />
      ) : null}
    </SafeAreaView>
  );
}
