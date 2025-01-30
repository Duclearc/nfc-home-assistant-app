import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useDataStore } from "~/store/data";

export function TagReader() {
  // TAG URL → haydan:///tag-data?query=hello&query2=world
  const params = useLocalSearchParams(); // { query: "hello", query2: "world" }

  const dataStore = useDataStore();
  const runWhenTabOpens = async () => {
    dataStore.setIsScanning(true);
    dataStore.setData(params);
  };

  // this is what makes the `runWhenTabOpens` function run whenever this tab "opens" (regardless of how you get here, e.g. user press, tag navigation, whatever)
  const navigation = useNavigation();
  useEffect(
    () => navigation.addListener("focus", runWhenTabOpens),
    [navigation]
  );

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        onPress={runWhenTabOpens}
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
