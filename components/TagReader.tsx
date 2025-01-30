import { toByteArray } from "base64-js";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { dashboard as DashboardProto } from "~/proto/gen/dashboard";
import useDashboardsStore from "~/stores/dashboards";
import { useDataStore } from "~/stores/data";

export function TagReader() {
  // TAG URL → haydan:///tag-data?query=hello&query2=world
  const { query } = useLocalSearchParams(); // { query: "hello", query2: "world" }

  const { isScanning, setIsScanning } = useDataStore();
  const dashboardStore = useDashboardsStore();
  const runWhenTabOpens = async () => {
    setIsScanning(true);
    const byteArray = toByteArray(query as string);
    const dashboardProtoData =
      DashboardProto.Dashboard.deserializeBinary(byteArray);
    const dashboard = dashboardProtoData.toObject();

    dashboardStore.addDashboard({
      url_base: dashboard.url_base!,
      api_key: dashboard.api_key!,
      name: dashboard.name!,
    });

    setTimeout(() => setIsScanning(false), 2000);
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
        disabled={isScanning}
        style={styles.btn}
      >
        <Text style={{ color: "black", fontSize: 20 }}>Scan a Tag</Text>
      </TouchableOpacity>
      {isScanning ? <ActivityIndicator /> : null}
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
