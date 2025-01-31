import { Pressable, PressableProps, StyleSheet } from "react-native";
import { useEffect } from "react";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { Home, LayoutDashboard, SmartphoneNfc } from "~/lib/icons/lucide";

export const icons = {
  index: (props: any) => <Home size={26} {...props} />,
  dashboards: (props: any) => <LayoutDashboard size={26} {...props} />,
  ["tag-config"]: (props: any) => <SmartphoneNfc size={26} {...props} />,
};
export type PossibleRoutes = keyof typeof icons;

interface TabBarButtonProps extends PressableProps {
  isFocused: boolean;
  label: string;
  routeName: PossibleRoutes;
  color: string;
}

export default function TabBarButton(props: TabBarButtonProps) {
  const { isFocused, label, routeName, color } = props;

  const scale = useSharedValue(0);

  useEffect(() => {
    scale.value = withSpring(
      typeof isFocused === "boolean" ? (isFocused ? 1 : 0) : isFocused,
      { duration: 350 }
    );
  }, [scale, isFocused]);

  const animatedIconStyle = useAnimatedStyle(() => ({
    transform: [{ scale: interpolate(scale.value, [0, 1], [1, 1.4]) }],
    top: interpolate(scale.value, [0, 1], [0, 8]),
  }));

  const animatedTextStyle = useAnimatedStyle(() => ({
    opacity: interpolate(scale.value, [0, 1], [1, 0]),
  }));

  return (
    <Pressable {...props} className="justify-center items-center gap-1 flex-1">
      <Animated.View style={[animatedIconStyle]}>
        {icons[routeName]({ color })}
      </Animated.View>

      <Animated.Text style={[{ color, fontSize: 11 }, animatedTextStyle]}>
        {label}
      </Animated.Text>
    </Pressable>
  );
}
