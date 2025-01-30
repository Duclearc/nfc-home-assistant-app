import { IconName } from "~/types/dashboard";
import { Lightbulb, AlarmClock } from "./lucide";

export const iconMap = {
  light: <Lightbulb className="text-black bg-black" />,
  alarm: <AlarmClock className="text-black bg-black" />,
};

export function getIcon(entity: string) {
  if (entity.includes("light.")) {
    return iconMap.light;
  }
  if (entity.includes("alarm.")) {
    return iconMap.alarm;
  }
  return null;
}
