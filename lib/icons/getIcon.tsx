import { IconName } from "~/types/dashboard";
import { Lightbulb, AlarmClock } from "./lucide";

export const iconMap = {
  lightbulb: <Lightbulb className="text-black bg-black" />,
  alarm: <AlarmClock className="text-black bg-black" />,
};

export function getIcon(icon: IconName) {
  return iconMap[icon];
}
