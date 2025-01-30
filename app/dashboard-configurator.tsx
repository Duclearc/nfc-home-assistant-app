import { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import DashboardItem from "~/components/dashboards/dashboard-item";
import DashboardItemForm from "~/components/dashboards/dashboard-item-form";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import useDashboardsStore from "~/stores/dashboards";
import { DashboardItem as TDashboardItem } from "~/types/dashboard";
import { Separator } from "~/components/ui/separator";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { toast } from "sonner-native";
import SaveDashDialog from "../components/tag-config/save-dash-dialog";

const DashboardConfigurator = () => {
  const dashboards = useDashboardsStore();

  const [dashboardName, setDashboardName] = useState("Test dash 1");
  const [homeAssistantUrl, setHomeAssistantUrl] = useState(
    "http://localhost:8123"
  );
  const [homeAssistantApiKey, setHomeAssistantApiKey] = useState("1234567890");

  const [dashboardItems, setDashboardItems] = useState<TDashboardItem[]>([
    {
      automationPath: "automation/test",
      icon: "lightbulb",
      name: "Test item 1",
    },
    {
      automationPath: "automation/test2",
      icon: "alarm",
      name: "Test item 2",
    },
  ]);

  const addItem = (newItem: TDashboardItem) => {
    setDashboardItems([...dashboardItems, newItem]);
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

            <View className="flex flex-row flex-wrap justify-between mb-2">
              {dashboardItems.map((item) => (
                <View key={item.name} className="w-[49%]">
                  <DashboardItem isEditable={false} dashItem={item} />
                </View>
              ))}
            </View>
            <View>
              <Text className="text-2xl font-light mb-4">Dashboard items</Text>
              <DashboardItemForm addItem={addItem} />
            </View>
          </View>

          <View className="p-4 border-t border-border bg-background">
            <SaveDashDialog
              dashboard={{
                name: dashboardName,
                urlBase: homeAssistantUrl,
                apiKey: homeAssistantApiKey,
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
