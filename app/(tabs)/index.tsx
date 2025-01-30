import { toByteArray } from "base64-js";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import { Text } from "~/components/ui/text";
import { SmartphoneNfc } from "~/lib/icons/lucide";
import { dashboard as DashboardProto } from "~/proto/gen/dashboard";
import { useDataStore } from "~/stores/data";
import { Dashboard, IconName } from "~/types/dashboard";

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

  const runWhenTabOpens = () => {
    setIsScanning(true);

    if (!query) return setIsScanning(false);
    const byteArray = toByteArray(query as string);
    const dashboardProtoData =
      DashboardProto.Dashboard.deserializeBinary(byteArray);
    const dashboard = dashboardProtoData.toObject();

    setCurrentDash({
      url_base: dashboard.url_base!,
      api_key: dashboard.api_key!,
      name: dashboard.name!,
      items: dashboard.items!.map((i) => ({
        name: i.name!,
        automation_path: i.automation_path!,
        icon: i.icon! as IconName,
      })),
    });
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
            <Button
              className="mb-10 items-center justify-center"
              children={
                <Text className="text-white font-bold text-3xl tracking-widest uppercase">
                  reset
                </Text>
              }
              onPress={() => {
                setCurrentDash(undefined);
              }}
            />
            <Text className="text-3xl font-light">{currentDash.name}</Text>
            <Separator className="my-2" />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
