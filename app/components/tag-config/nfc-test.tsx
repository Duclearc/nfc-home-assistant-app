import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import NfcManager, { NfcTech } from "react-native-nfc-manager";

// Pre-step, call this before any NFC operations
NfcManager.start();

function NfcTest() {
  async function readNdef() {
    try {
      // register for the NFC tag with NDEF in it
      const res = await NfcManager.requestTechnology(NfcTech.Ndef);
      console.log("RESPONSE: ", res);
      // the resolved tag object will contain `ndefMessage` property
      const tag = await NfcManager.getTag();
      console.warn("Tag found", JSON.stringify(tag, null, 2));
    } catch (ex) {
      console.warn("Oops!", ex);
    } finally {
      // stop the nfc scanning
      NfcManager.cancelTechnologyRequest();
    }
  }

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity onPress={readNdef}>
        <Text>Scan a Tag</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default NfcTest;
