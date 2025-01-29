import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect } from "react";
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
  const params = useLocalSearchParams();
  const readNdef = async () => {
    dataStore.setData(undefined);
    dataStore.setIsScanning(true);
    try {
      // // register for the NFC tag with NDEF in it
      // const res = await NfcManager.requestTechnology(NfcTech.Ndef);
      // // the resolved tag object will contain `ndefMessage` property
      // const tag = await NfcManager.getTag();

      // const payload = tag?.ndefMessage[1].payload;
      // let decodePayload = Ndef.uri.decodePayload(payload);
      // decodePayload = decodePayload.startsWith("{")
      //   ? decodePayload
      //   : `{${decodePayload}`;
      // const { data } = JSON.parse(decodePayload);

      dataStore.setData(params);
    } catch (ex) {
      console.warn("Oops!", ex);
    } finally {
      // stop the nfc scanning
      NfcManager.cancelTechnologyRequest();
      dataStore.setIsScanning(false);
    }
  };

  const navigation = useNavigation();
  useEffect(
    () => navigation.addListener("focus", () => readNdef()),
    [navigation]
  );
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        onPress={readNdef}
        disabled={dataStore.isScanning}
        style={styles.btn}
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
    marginBottom: 50,
  },
  btn: {
    borderWidth: 1,
    borderColor: "black",
    height: 80,
    borderRadius: 10,
    width: "50%",
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
