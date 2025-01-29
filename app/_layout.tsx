import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import "../global.css";
import { PortalHost } from "@rn-primitives/portal";
import { Toaster } from "sonner-native";

export default function RootLayout() {
  return (
    <GestureHandlerRootView>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="dashboard-configurator"
          options={{ title: "Configure new dashboard" }}
        />
      </Stack>
      <PortalHost />
      <Toaster position="top-center" />
    </GestureHandlerRootView>
  );
}
