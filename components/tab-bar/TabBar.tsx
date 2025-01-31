import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import React from "react";
import { View } from "react-native";
import TabBarButton, { PossibleRoutes } from "./TabBarButton";
import { Colors } from "~/constants/colours";
import { useColorScheme } from "~/lib/useColorScheme";

const TabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  let { colorScheme } = useColorScheme();

  const activeColor = Colors[colorScheme].tabIconSelected;
  const inactiveColor = Colors[colorScheme].tabIconDefault;

  return (
    <View className="flex-row justify-between align-center bg-white py-5  my-5 mx-10 rounded-3xl shadow-md shadow-gray-500/30">
      {state.routes.map((route, index) => {
        const label = descriptors[route.key].options.title ?? route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TabBarButton
            key={route.name}
            onPress={onPress}
            onLongPress={onLongPress}
            isFocused={isFocused}
            routeName={route.name as PossibleRoutes}
            color={isFocused ? activeColor : inactiveColor}
            label={label}
          />
        );
      })}
    </View>
  );
};

export default TabBar;
