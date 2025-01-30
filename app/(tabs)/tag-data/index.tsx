import { View, ScrollView } from "react-native";
import { TagReader } from "~/components/TagReader";
import { Text } from "~/components/ui/text";
import { useDataStore } from "~/store/data";

export default function TagConfigScreen() {
  const dataStore = useDataStore();
  return (
    <View style={{ padding: 10, flex: 1 }}>
      <ScrollView>
        <TagReader />
        {!dataStore.isScanning ? (
          <Text style={{ color: "black", fontSize: 20 }}>
            {JSON.stringify(dataStore.data)}
          </Text>
        ) : null}
      </ScrollView>
    </View>
  );
}
