import { ScrollView } from "react-native";

import DashCard from "../../components/dashboards/dash-card";

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
