import { ScrollView, View } from "react-native";

import DashCard from "../../components/dashboards/dash-card";
import { useState } from "react";
import { Text } from "../../components/ui/text";
import { SmartphoneNfc } from "../../lib/icons/lucide";
import { SafeAreaView } from "react-native-safe-area-context";

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
  const [currentDash, setCurrentDash] = useState();

  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="flex-1s">
        {currentDash ? <DashCard /> : <ScanView />}
      </ScrollView>
    </SafeAreaView>
  );
}
