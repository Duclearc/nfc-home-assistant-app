import { Lightbulb, AlarmClock, FileQuestion } from "./lucide";

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
  return <FileQuestion className="text-black bg-black" />;
}
