import { Lightbulb, AlarmClock, FileQuestion, Nfc } from "./lucide";

export const iconMap = {
  light: <Lightbulb className="text-black bg-black" />,
  alarm: <AlarmClock className="text-black bg-black" />,
  motion: <Nfc className="text-black bg-black" />,
};

export function getIcon(entity: string) {
  if (entity.includes("light.")) {
    return iconMap.light;
  }
  if (entity.includes("alarm.")) {
    return iconMap.alarm;
  }
  if (entity.includes("sensor.")) {
    return iconMap.motion;
  }
  return <FileQuestion className="text-black bg-black" />;
}
