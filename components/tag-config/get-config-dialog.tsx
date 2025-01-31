import { useEffect, useState } from "react";
import { View } from "react-native";
import nfcManager from "react-native-nfc-manager";
import { toast } from "sonner-native";
import { SmartphoneNfc } from "~/lib/icons/lucide";
import { DashboardConfig } from "~/types/dashboard";
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
import { readDashboardFromTag } from "../../lib/nfc/read-dashboard";

// Pre-step, call this before any NFC operations
nfcManager.start();

const GetTagConfigDialog = ({
  saveConfig,
}: {
  saveConfig: (config: Pick<DashboardConfig, "api_key" | "url_base">) => void;
}) => {
  const [open, setOpen] = useState(false);

  const attemptRead = async () => {
    const dashboard = await readDashboardFromTag();

    if (!dashboard) {
      toast.error("No dashboard found");
      return;
    }

    saveConfig({
      api_key: dashboard.api_key!,
      url_base: dashboard.url_base!,
    });

    setOpen(false);
  };

  useEffect(() => {
    if (open) {
      attemptRead();
    } else {
      nfcManager.cancelTechnologyRequest();
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Text>Get config from another tag</Text>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Scan NFC Tag</DialogTitle>
          <DialogDescription>
            Hold your phone against the NFC tag get the config.
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

export default GetTagConfigDialog;
