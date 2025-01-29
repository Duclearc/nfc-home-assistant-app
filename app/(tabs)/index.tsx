import { ScrollView } from "react-native";

import DashCard from "../components/dash-card";

export default function HomeScreen() {
  return (
    <ScrollView>
      <DashCard />
      <DashCard />
      <DashCard />
      <DashCard />
      <DashCard />
      <DashCard />
    </ScrollView>
  );
}
