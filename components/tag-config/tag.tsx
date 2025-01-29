import { View } from "react-native";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Trash2 } from "~/lib/icons/lucide";

export type Tag = { id: number; name: string; dashboard: string };

export default function TagCard({
  tag,
  removeTag,
  updateTag,
}: {
  tag: Tag;
  removeTag: (id: number) => void;
  updateTag: (t: Tag) => void;
}) {
  return (
    <Card key={tag.id} className="my-2">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text font-medium">{tag.name}</CardTitle>
        <Button variant="ghost" size="icon" onPress={() => removeTag(tag.id)}>
          <Trash2 className="h-4 w-4 text-black" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-2">
        <View className="space-y-1">
          <Label htmlFor={`name-${tag.id}`}>Name</Label>
          <Input
            id={`name-${tag.id}`}
            value={tag.name}
            onChangeText={(text) => updateTag({ ...tag, name: text })}
            placeholder="Enter tag name"
          />
        </View>
      </CardContent>
    </Card>
  );
}
