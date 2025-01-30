import { fromByteArray } from "base64-js";
import NfcManager, { Ndef, NfcTech } from "react-native-nfc-manager";
import config from "~/app.config.js";
import { dashboard as DashboardProto } from "~/proto/gen/dashboard";
import { Dashboard } from "~/types/dashboard";
import { MAX_PAYLOAD_SIZE_BYTES } from "./constants";

export const writeDashboardToTag = async (dashboard: Dashboard) => {
  let result = { success: false, error: "" };

  console.log(
    "Attempting to write dashboard: ",
    JSON.stringify(dashboard, null, 2)
  );

  try {
    const jsonString = JSON.stringify(dashboard);

    const dashboardProto = DashboardProto.Dashboard.fromObject({
      ...dashboard,
      api_key: dashboard.api_key,
      url_base: dashboard.url_base,
      items: dashboard.items.map((i) => ({
        ...i,
        automation_path: i.entity,
      })),
    });

    const dashboardBinary = dashboardProto.serializeBinary();
    const base64Data = fromByteArray(dashboardBinary);

    const jsonStringSize = new TextEncoder().encode(jsonString).length;
    const base64DataSize = new TextEncoder().encode(base64Data).length;

    // LOOK HERE
    const url = `${config.scheme}:///?query=${base64Data}`;

    console.log(`JSON string size: ${jsonStringSize} bytes`);
    console.log(`Base64 data size: ${base64DataSize} bytes`);

    if (base64DataSize > MAX_PAYLOAD_SIZE_BYTES) {
      throw new Error(
        `Dashboard data exceeds maximum size of ${MAX_PAYLOAD_SIZE_BYTES} bytes`
      );
    }

    // STEP 1
    await NfcManager.requestTechnology(NfcTech.Ndef);

    console.log(`Writing ${base64DataSize} bytes to NFC tag`);

    const bytes = Ndef.encodeMessage([Ndef.uriRecord(url)]);

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
