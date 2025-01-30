import { useEffect, useState } from "react";
import { View } from "react-native";
import nfcManager from "react-native-nfc-manager";
import { SmartphoneNfc } from "~/lib/icons/lucide";
import useDashboardsStore from "~/stores/dashboards";
import { Dashboard } from "~/types/dashboard";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Text } from "../ui/text";

// Pre-step, call this before any NFC operations
nfcManager.start();

const SaveDashDialog = ({ dashboard }: { dashboard: Dashboard }) => {
  const [open, setOpen] = useState(false);
  const dashboards = useDashboardsStore();

  const attemptRead = async () => {
    console.log("Attempting to read from NFC tag...");
    // todo
  };

  useEffect(() => {
    if (open) {
      attemptRead();
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full">
          <Text>Save to NFC Tag</Text>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Scan NFC Tag</DialogTitle>
          <DialogDescription>
            Hold your phone against the NFC tag to save this dashboard.
          </DialogDescription>
        </DialogHeader>

        <View className="flex flex-col items-center justify-center py-8">
          <View className="w-24 h-24 rounded-full bg-muted flex items-center justify-center">
            <SmartphoneNfc size={48} className="text-muted-foreground" />
          </View>
          <Text className="mt-4 text-center text-muted-foreground">
            Waiting for NFC tag...
          </Text>
        </View>
      </DialogContent>
    </Dialog>
  );
};

export default SaveDashDialog;
