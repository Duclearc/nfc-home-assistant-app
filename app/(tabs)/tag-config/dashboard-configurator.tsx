import { useEffect, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { toast } from "sonner-native";
import DashboardItem from "~/components/dashboards/dashboard-item";
import DashboardItemForm from "~/components/dashboards/dashboard-item-form";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Separator } from "~/components/ui/separator";
import { Text } from "~/components/ui/text";
import {
  DashboardConfig,
  DashboardItem as TDashboardItem,
} from "~/types/dashboard";
import SaveDashDialog from "~/components/tag-config/save-dashboard-dialog";
import useHomeAssistantStore from "~/stores/home-assistant";
import { getDevices } from "~/lib/home-assistant/client";
import GetTagConfigDialog from "../../../components/tag-config/get-config-dialog";

export default function DashboardConfigurator() {
  const {
    isLoading: isLoadingHomeAssistant,
    setIsLoading: setIsLoadingHomeAssistant,
    setDevices,
    devices,
  } = useHomeAssistantStore();

  const [dashboardName, setDashboardName] = useState(
    `Test dash ${new Date().toLocaleString()}`
  );
  const [homeAssistantUrl, setHomeAssistantUrl] = useState(
    ""
    // process.env.EXPO_PUBLIC_HOME_ASSISTANT_URL || ""
  );
  const [homeAssistantApiKey, setHomeAssistantApiKey] = useState(
    ""
    // process.env.EXPO_PUBLIC_HOME_ASSISTANT_API_KEY || ""
  );

  const [dashboardItems, setDashboardItems] = useState<TDashboardItem[]>([]);

  const addItem = (newItem: TDashboardItem) => {
    setDashboardItems([...dashboardItems, newItem]);
  };

  const removeItem = (item: TDashboardItem) => {
    setDashboardItems(dashboardItems.filter((i) => i.name !== item.name));
  };

  const saveConfig = (
    config: Pick<DashboardConfig, "api_key" | "url_base">
  ) => {
    setHomeAssistantUrl(config.url_base);
    setHomeAssistantApiKey(config.api_key);
    handleGetDevices(config.url_base, config.api_key);
  };

  const handleGetDevices = async (url: string, key: string) => {
    setIsLoadingHomeAssistant(true);
    if (!url || !key) {
      toast.error("Please enter a Home Assistant URL and API key");
      return;
    }

    try {
      const devices = await getDevices(url, key);
      setDevices(devices);
    } catch (error) {
      console.error(error);
      toast.error("Error fetching devices from Home Assistant");
    } finally {
      setIsLoadingHomeAssistant(false);
    }
  };

  console.log(
    JSON.stringify(
      {
        dashboardName,
        homeAssistantUrl,
        homeAssistantApiKey,
        dashboardItems,
      },
      null,
      2
    )
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="p-4 flex-1">
            <Label className="mb-2" htmlFor="dashboard-name">
              1. Enter dashboard name
            </Label>
            <Input
              id="dashboard-name"
              placeholder="Waking up"
              value={dashboardName}
              onChangeText={setDashboardName}
            />

            <Separator className="my-6 bg-slate-500" />

            <Label className="mb-2">2. Configure Home Assistant</Label>

            <View className="mb-4">
              <GetTagConfigDialog saveConfig={saveConfig} />
            </View>

            <Separator className="my-2" />

            <Text className="text-sm text-muted-foreground mb-2">
              Or enter manually
            </Text>
            <Input
              placeholder="Home assistant URL"
              value={homeAssistantUrl}
              onChangeText={setHomeAssistantUrl}
              className="mb-4"
            />
            <Input
              placeholder="Home assistant API key"
              value={homeAssistantApiKey}
              onChangeText={setHomeAssistantApiKey}
            />
            <Button
              variant="outline"
              className="my-2"
              onPress={() =>
                handleGetDevices(homeAssistantUrl, homeAssistantApiKey)
              }
            >
              <Text>Get devices</Text>
            </Button>

            <Separator className="my-6 bg-slate-500" />

            <Label className="mb-2">3. Configure dashboard items</Label>

            <View className="flex flex-row flex-wrap justify-between mb-2 w-full min-h-36 gap-4">
              {dashboardItems.map((item) => (
                <Pressable
                  key={item.name}
                  className="w-[48%]"
                  onPress={() => removeItem(item)}
                >
                  <DashboardItem dashItem={item} />
                </Pressable>
              ))}

              {devices.length > 0 && homeAssistantUrl && homeAssistantApiKey ? (
                <DashboardItemForm addItem={addItem} />
              ) : (
                <Text className="text-muted-foreground">
                  Configure Home Assistant to add items to the dashboard
                </Text>
              )}
            </View>
          </View>
          {isLoadingHomeAssistant && (
            <Text>Loading data from Home Assistant...</Text>
          )}

          <View className="p-4 border-t border-border bg-background">
            <SaveDashDialog
              dashboard={{
                name: dashboardName,
                url_base: homeAssistantUrl,
                api_key: homeAssistantApiKey,
                items: dashboardItems,
              }}
            />
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
