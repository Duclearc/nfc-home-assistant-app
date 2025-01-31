import nfcManager, { Ndef, NfcTech } from "react-native-nfc-manager";
import { toast } from "sonner-native";
import { dashboard as DashboardProto } from "~/proto/gen/dashboard";
import { toByteArray } from "base64-js";

export const readDashboardFromTag = async () => {
  try {
    // register for the NFC tag with NDEF in it
    await nfcManager.requestTechnology(NfcTech.Ndef);
    // the resolved tag object will contain `ndefMessage` property
    const tag = await nfcManager.getTag();

    if (!tag) throw new Error("No tag found");

    const urlUnit8 = tag.ndefMessage[0].payload; // integer array

    const message = Ndef.uri.decodePayload(
      urlUnit8 as unknown as Uint8Array<ArrayBufferLike>
    );

    const encodedDash = message.split("=")[1];

    if (!encodedDash) throw new Error("No encoded dash found");

    const byteArray = toByteArray(encodedDash);

    return DashboardProto.Dashboard.deserialize(byteArray).toObject();
  } catch (ex) {
    console.error(ex);
    if (ex instanceof Error) {
      toast.error(ex.message);
    } else {
      toast.error("An unknown error occurred");
    }
  } finally {
    // stop the nfc scanning
    nfcManager.cancelTechnologyRequest();
  }
};
