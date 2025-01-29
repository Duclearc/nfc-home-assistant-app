import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import NfcManager, { NfcTech, Ndef } from "react-native-nfc-manager";
import { useDataStore } from "~/store/data";

// Pre-step, call this before any NFC operations
NfcManager.start();

export function TagReader() {
  const dataStore = useDataStore();
  async function readNdef() {
    dataStore.setData(undefined);
    dataStore.setIsScanning(true);
    try {
      // register for the NFC tag with NDEF in it
      const res = await NfcManager.requestTechnology(NfcTech.Ndef);
      // the resolved tag object will contain `ndefMessage` property
      const tag = await NfcManager.getTag();

      const payload = tag?.ndefMessage[1].payload;
      let decodePayload = Ndef.uri.decodePayload(payload);
      decodePayload = decodePayload.startsWith("{")
        ? decodePayload
        : `{${decodePayload}`;
      const { data } = JSON.parse(decodePayload);

      dataStore.setData(data);
    } catch (ex) {
      console.warn("Oops!", ex);
    } finally {
      // stop the nfc scanning
      NfcManager.cancelTechnologyRequest();
      dataStore.setIsScanning(false);
    }
  }

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        onPress={readNdef}
        disabled={dataStore.isScanning}
        style={{
          borderWidth: 1,
          borderColor: "black",
          height: 80,
          borderRadius: 10,
          width: "50%",
          padding: 20,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ color: "black", fontSize: 20 }}>Scan a Tag</Text>
      </TouchableOpacity>
      {dataStore.isScanning ? <ActivityIndicator /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 50
  },
});
