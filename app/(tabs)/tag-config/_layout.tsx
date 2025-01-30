import { Stack } from "expo-router";
import { SafeAreaView } from "react-native";
import { STYLE } from "~/lib/constants";

export default function TagConfigLayout() {
  return (
    <SafeAreaView className={STYLE.layout}>
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
