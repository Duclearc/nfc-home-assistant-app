import { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { toast } from "sonner-native";
import { iconMap } from "~/lib/icons/getIcon";
import { Plus } from "~/lib/icons/lucide";
import { IconName, DashboardItem as TDashboardItem } from "~/types/dashboard";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Text } from "../ui/text";
import useHomeAssistantStore from "../../stores/home-assistant";

const DashboardItemForm = ({
  addItem,
}: {
  addItem: (item: TDashboardItem) => void;
}) => {
  const { isLoading: isLoadingHomeAssistant, devices } =
    useHomeAssistantStore();
  const [open, setOpen] = useState(false);

  const [url, setUrl] = useState("");
  const [name, setName] = useState("");
  const [icon, setIcon] = useState<IconName | undefined>();

  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 12,
    right: 12,
  };

  function handleAddItem() {
    if (!name) {
      toast.error("Please enter a name");
      return;
    }
    if (!url) {
      toast.error("Please enter a URL");
      return;
    }
    if (!icon) {
      toast.error("Please select an icon");
      return;
    }

    toast.success("Item added to dashboard");
    addItem({
      name,
      automation_path: url,
      icon,
    });
    setOpen(false);
  }

  const iconOptions = devices.map((device) => ({
    label: `${device.name}: ${device.entities.join("|")}`,
    value: device.id,
  }));

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          disabled={isLoadingHomeAssistant || devices.length === 0}
          className="w-full flex flex-row items-center justify-center"
        >
          <Plus className="text-white w-3 h-3 mr-2" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add item to dashboard</DialogTitle>
          <DialogDescription>
            Add a new item to your dashboard.
          </DialogDescription>

          <Label htmlFor="item-name">Name</Label>
          <Input placeholder="Item name" onChangeText={setName} />

          <Label htmlFor="item-url">
            Item URL (soon to be automation selector)
          </Label>
          <Input placeholder="Insert item URL" onChangeText={setUrl} />

          <Select
            value={iconOptions.find((option) => option.value === icon)}
            onValueChange={(option) => setIcon(option?.value as IconName)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select icon" />
            </SelectTrigger>
            <SelectContent insets={contentInsets}>
              {iconOptions.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  label={option.label}
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </DialogHeader>
        <DialogFooter>
          <Button onPress={handleAddItem}>
            <Text>OK</Text>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DashboardItemForm;
