import { Tabs } from "expo-router";
import React from "react";

import { HapticTab } from "@/components/HapticTab";
import { LayoutDashboard } from "~/lib/icons/layout-dashboard";
import { SmartphoneNfc } from "~/lib/icons/smartphone-nfc";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#000",
        headerShown: false,
        tabBarButton: HapticTab,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <LayoutDashboard
              className={focused ? "text-black" : "text-slate-500"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="tag-config"
        options={{
          title: "Tags",
          tabBarIcon: ({ focused }) => (
            <SmartphoneNfc
              className={focused ? "text-black" : "text-slate-500"}
            />
          ),
        }}
      />
    </Tabs>
  );
}
