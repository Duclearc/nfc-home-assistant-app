import { useEffect, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
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
import { DashboardItem as TDashboardItem } from "~/types/dashboard";
import SaveDashDialog from "../components/tag-config/save-dashboard-dialog";
import useHomeAssistantStore from "../stores/home-assistant";
import { getDevices } from "../lib/home-assistant/client";

const DashboardConfigurator = () => {
  const {
    isLoading: isLoadingHomeAssistant,
    setIsLoading: setIsLoadingHomeAssistant,
    setDevices,
    devices,
  } = useHomeAssistantStore();

  const [dashboardName, setDashboardName] = useState("Test dash 1");
  const [homeAssistantUrl, setHomeAssistantUrl] = useState(
    process.env.EXPO_PUBLIC_HOME_ASSISTANT_URL || ""
  );
  const [homeAssistantApiKey, setHomeAssistantApiKey] = useState(
    process.env.EXPO_PUBLIC_HOME_ASSISTANT_API_KEY || ""
  );

  const [dashboardItems, setDashboardItems] = useState<TDashboardItem[]>([]);

  const addItem = (newItem: TDashboardItem) => {
    setDashboardItems([...dashboardItems, newItem]);
  };

  const handleGetDevices = async () => {
    setIsLoadingHomeAssistant(true);
    if (!homeAssistantUrl || !homeAssistantApiKey) {
      toast.error("Please enter a Home Assistant URL and API key");
      return;
    }

    try {
      const devices = await getDevices(homeAssistantUrl, homeAssistantApiKey);
      setDevices(devices);
    } catch (error) {
      console.error(error);
      toast.error("Error fetching devices from Home Assistant");
    } finally {
      setIsLoadingHomeAssistant(false);
    }
  };

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
            <Label htmlFor="dashboard-name">Dashboard name</Label>
            <Input
              placeholder="Waking up"
              value={dashboardName}
              onChangeText={setDashboardName}
            />

            <Separator className="my-4" />

            <Label htmlFor="home-assistant-url">Home Assistant URL</Label>
            <Input
              placeholder="Add URL here"
              value={homeAssistantUrl}
              onChangeText={setHomeAssistantUrl}
              className="mb-4"
            />
            <Label htmlFor="home-assistant-api-key">
              Home Assistant API Key
            </Label>
            <Input
              placeholder="Add key here"
              value={homeAssistantApiKey}
              onChangeText={setHomeAssistantApiKey}
            />
            <Button
              variant="ghost"
              className="mt-2"
              onPress={() => toast.info("Coming soon")}
            >
              <Text>Get this config from another dashboard</Text>
            </Button>

            <Separator className="my-4" />

            <View>
              <Text className="text-2xl font-light mb-4">Dashboard items</Text>
              <Button
                disabled={isLoadingHomeAssistant}
                variant="outline"
                className="w-full my-2"
                onPress={handleGetDevices}
              >
                <Text>Get devices from Home Assistant</Text>
              </Button>
            </View>

            <View className="flex flex-row flex-wrap justify-between mb-2">
              {dashboardItems.map((item) => (
                <View key={item.name} className="w-[49%]">
                  <DashboardItem isEditable={false} dashItem={item} />
                </View>
              ))}
            </View>

            <DashboardItemForm addItem={addItem} />
            {isLoadingHomeAssistant && (
              <Text>Loading data from Home Assistant...</Text>
            )}
          </View>

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
};

export default DashboardConfigurator;
