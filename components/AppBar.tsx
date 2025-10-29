import { Pressable, View } from "react-native";
import { Box } from "./ui/box";
import { Heading } from "./ui/heading";
import { Feather } from "@expo/vector-icons";

import { useNavigation, useRouter } from "expo-router";

type AppBarType = {
  isDetail?: boolean;
  label?: string;
};

export default function AppBar({
  isDetail = false,
  label = "Bear",
}: AppBarType) {
  const router = useRouter();
  const navigation = useNavigation();

  const handleNavigateRoute = (route: string) => {
    router.push(route);
  };

  const handleRightButton = () => {
    navigation.goBack();
  };
  return (
    <View>
      <Box
        className={`px-4 py-3 bg-white rounded-b-lg gap-3 flex flex-row items-center ${isDetail ? "justify-start" : "justify-between"}`}
      >
        {isDetail && (
          <Pressable onPress={handleRightButton}>
            <Feather name="arrow-left" size={24} />
          </Pressable>
        )}

        <Heading className="text-2xl font-extrabold">{label}</Heading>
        {!isDetail && (
          <Pressable onPress={() => handleNavigateRoute("settings")}>
            <Feather name="settings" size={20} />
          </Pressable>
        )}
      </Box>
    </View>
  );
}
