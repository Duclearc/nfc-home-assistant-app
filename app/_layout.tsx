import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import "../global.css";
import { PortalHost } from "@rn-primitives/portal";
import { Toaster } from "sonner-native";
import { SafeAreaView } from "react-native";

export default function RootLayout() {
  return (
    <GestureHandlerRootView>
      <SafeAreaView style={{ flex: 1 }}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
        <PortalHost />
        <Toaster position="top-center" />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
