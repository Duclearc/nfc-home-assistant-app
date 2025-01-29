import { ScrollView } from "react-native";

import { Text } from "~/components/ui/text";
import NfcTest from "../components/tag-config/nfc-test";

export default function TagConfigScreen() {
  return (
    <ScrollView>
      <NfcTest />
    </ScrollView>
  );
}
