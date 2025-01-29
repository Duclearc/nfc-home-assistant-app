import { Tabs } from "expo-router";
import React from "react";

import { HapticTab } from "@/components/HapticTab";
import { LayoutDashboard, SmartphoneNfc, ScanText } from "~/lib/icons/lucide";

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
       <Tabs.Screen
        name="tag-data/index"
        options={{
          title: "Scan",
          tabBarIcon: ({ focused }) => (
            <ScanText
              className={focused ? "text-black" : "text-slate-500"}
            />
          ),
        }}
      />
    </Tabs>
  );
}
