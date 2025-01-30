import { useState } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { toast } from "sonner-native";
import { Plus } from "~/lib/icons/lucide";
import { IconName, DashboardItem as TDashboardItem } from "~/types/dashboard";
import useHomeAssistantStore from "../../stores/home-assistant";
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
import { Text } from "../ui/text";
import { Picker } from "@react-native-picker/picker";

const DashboardItemForm = ({
  addItem,
}: {
  addItem: (item: TDashboardItem) => void;
}) => {
  const { isLoading: isLoadingHomeAssistant, devices } =
    useHomeAssistantStore();
  const [open, setOpen] = useState(false);

  const [entity, setEntity] = useState("");
  const [name, setName] = useState("");

  function handleAddItem() {
    if (!name) {
      toast.error("Please enter a name");
      return;
    }
    if (!entity) {
      toast.error("Please select an entity to control");
      return;
    }

    toast.success("Item added to dashboard");
    addItem({
      name,
      entity: entity,
    });
    setOpen(false);
  }

  const iconOptions = devices
    .map((device) =>
      device.entities.map((entity) => ({
        label: `${device.name}: ${entity.split(".")[1]}`,
        value: entity,
      }))
    )
    .flat();

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
      <DialogContent className="w-[90vw] max-w-[500px] sm:w-full">
        <DialogHeader>
          <DialogTitle>Add item to dashboard</DialogTitle>
          <DialogDescription>
            Add a new item to your dashboard.
          </DialogDescription>

          <Picker
            selectedValue={entity}
            onValueChange={(value) => {
              console.log(value);
              setEntity(value);
              setName(
                iconOptions
                  .find((option) => option.value === value)
                  ?.label.split(":")[0] || "?"
              );
            }}
          >
            {iconOptions.map((option) => (
              <Picker.Item
                key={option.value}
                label={option.label}
                value={option.value}
              />
            ))}
          </Picker>

          <Label htmlFor="item-name">Name</Label>
          <Input placeholder="Item name" onChangeText={setName} value={name} />

          <Label htmlFor="item-url">Device entity</Label>
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
