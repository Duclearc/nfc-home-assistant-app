import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import "../global.css";
import { PortalHost } from "@rn-primitives/portal";
import { Toaster } from "sonner-native";
import { SafeAreaView } from "react-native";
import { STYLE } from "~/lib/constants";

export default function RootLayout() {
  return (
    <GestureHandlerRootView>
      <SafeAreaView className={STYLE.layout}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
        <PortalHost />
        <Toaster position="top-center" />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
