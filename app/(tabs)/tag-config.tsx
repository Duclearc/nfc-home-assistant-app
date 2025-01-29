import { useState } from "react";
import { ScrollView, View } from "react-native";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import TagCard, { Tag } from "../../components/tag-config/tag";
import { Plus } from "~/lib/icons/lucide";
import { useRouter } from "expo-router";

const initialTags = [
  {
    id: 1,
    name: "Wake up",
    icon: "bed",
    dashboard: "",
  },
  {
    id: 2,
    name: "Cooking",
    icon: "chef-hat",
    dashboard: "",
  },
];

export default function TagConfigScreen() {
  const router = useRouter();

  const [tags, setTags] = useState<Tag[]>(initialTags);

  const addTag = () => {
    const newTag = { id: Date.now(), name: "", icon: "", dashboard: "" };
    setTags([...tags, newTag]);
  };

  const removeTag = (id: number) => {
    setTags(tags.filter((tag) => tag.id !== id));
  };

  const updateTag = (tag: Tag) => {
    setTags(tags.map((t) => (t.id === tag.id ? tag : t)));
  };
  return (
    <ScrollView>
      <View className="p-4">
        <Text className="text-2xl font-bold">Configure dashboards</Text>
        {tags.map((tag) => (
          <TagCard
            key={tag.id}
            tag={tag}
            updateTag={updateTag}
            removeTag={removeTag}
          />
        ))}
        <Button
          onPress={addTag}
          className="w-full"
          onPressIn={() => router.navigate("/dashboard-configurator")}
        >
          <Text>
            <Plus className="mr-2 h-4 w-4" /> Configure new dashboard
          </Text>
        </Button>
      </View>
    </ScrollView>
  );
}
