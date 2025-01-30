import { Stack } from "expo-router";
import { SafeAreaView } from "react-native";

export default function TagConfigLayout() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack screenOptions={{ header: undefined }}>
        <Stack.Screen
          name="index"
          options={{ headerShown: false, title: "Tags" }}
        />
        <Stack.Screen
          name="dashboard-configurator"
          options={{ title: "Configure Dashboard" }}
        />
      </Stack>
    </SafeAreaView>
  );
}
