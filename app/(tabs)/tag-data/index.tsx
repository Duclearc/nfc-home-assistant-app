import { View, ScrollView } from "react-native";
import TagReader from "~/components/TagReader";
import { Text } from "~/components/ui/text";
import { useDataStore } from "~/store/data";

export default function TagConfigScreen() {
  const dataStore = useDataStore();
  return (
    <View
      style={{
        padding: 10,
        flex: 1,
      }}
    >
      <ScrollView>
        <TagReader />
        <Text>Hello</Text>
      </ScrollView>
    </View>
  );
}
