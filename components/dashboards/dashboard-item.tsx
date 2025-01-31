import { Card, CardTitle, CardHeader, CardContent } from "../ui/card";
import { DashboardItem as TDashboardItem } from "~/types/dashboard";
import { getIcon } from "~/lib/icons/getIcon";
import { ActivityIndicator, View } from "react-native";
import { Text } from "../ui/text";

const DashboardItem = ({
  dashItem,
  isLoading = false,
}: {
  isLoading?: boolean;
  dashItem: TDashboardItem & { state?: string };
}) => {
  return (
    <Card className="flex-col items-center justify-between h-36">
      <CardHeader>
        <CardTitle className="text-sm">{dashItem.name}</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <View>
            {getIcon(dashItem.entity)}
            <Text className="text-black">{dashItem.state}</Text>
          </View>
        )}
      </CardContent>
    </Card>
  );
};

export default DashboardItem;
