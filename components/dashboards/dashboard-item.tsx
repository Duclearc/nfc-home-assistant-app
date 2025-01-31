import { Card, CardTitle, CardHeader, CardContent } from "../ui/card";
import { DashboardItem as TDashboardItem } from "~/types/dashboard";
import { getIcon } from "~/lib/icons/getIcon";
import { ActivityIndicator } from "react-native";

const DashboardItem = ({
  dashItem,
  isLoading = false,
}: {
  isLoading?: boolean;
  dashItem: TDashboardItem;
}) => {
  return (
    <Card className="flex-col items-center justify-between min-h-32">
      <CardHeader>
        <CardTitle className="text-sm">{dashItem.name}</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? <ActivityIndicator /> : getIcon(dashItem.entity)}
      </CardContent>
    </Card>
  );
};

export default DashboardItem;
