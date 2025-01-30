import NfcManager, { NfcTech, Ndef } from "react-native-nfc-manager";
import { Dashboard } from "~/types/dashboard";
import { MAX_PAYLOAD_SIZE_BYTES } from "./constants";

export const writeDashToTag = async (dashboard: Dashboard) => {
  let result = { success: false, error: "" };

  try {
    const dashboardString = JSON.stringify(dashboard); // use proto instead
    const payloadSize = new TextEncoder().encode(dashboardString).length;

    if (payloadSize > MAX_PAYLOAD_SIZE_BYTES) {
      throw new Error(
        `Dashboard data exceeds maximum size of ${MAX_PAYLOAD_SIZE_BYTES} bytes`
      );
    }

    // STEP 1
    await NfcManager.requestTechnology(NfcTech.Ndef);

    console.log(`Writing ${payloadSize} bytes to NFC tag`);

    const bytes = Ndef.encodeMessage([Ndef.textRecord(dashboardString)]);

    if (bytes) {
      await NfcManager.ndefHandler // STEP 2
        .writeNdefMessage(bytes); // STEP 3
      result.success = true;
    }
  } catch (ex) {
    console.error(ex);
    if (ex instanceof Error) {
      result.error = ex.message;
    } else {
      result.error = "Unknown error";
    }
  } finally {
    // STEP 4
    NfcManager.cancelTechnologyRequest();
  }

  return result;
};
