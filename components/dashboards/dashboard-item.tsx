import { Card, CardTitle, CardHeader, CardContent } from "../ui/card";
import { TDashboardItem } from "~/types/dashboard";
import { getIcon } from "~/lib/icons/getIcon";

const DashboardItem = ({
  isEditable,
  dashItem,
}: {
  isEditable: boolean;
  dashItem: TDashboardItem;
}) => {
  return (
    <Card className="flex-col items-center justify-between">
      <CardHeader>
        <CardTitle className="text-sm">{dashItem.name}</CardTitle>
      </CardHeader>
      <CardContent>{getIcon(dashItem.icon)}</CardContent>
    </Card>
  );
};

export default DashboardItem;
