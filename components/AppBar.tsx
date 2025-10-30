import { Pressable, View } from "react-native";
import { Box } from "./ui/box";
import { Heading } from "./ui/heading";
import { Feather } from "@expo/vector-icons";

import { useNavigation } from "expo-router";

type AppBarType = {
  isDetail?: boolean;
  label?: string;
};

export default function AppBar({
  isDetail = false,
  label = "Bear",
}: AppBarType) {
  const navigation = useNavigation();

  const handleRightButton = () => {
    navigation.goBack();
  };
  return (
    <Box
      className={`px-4 py-3 rounded-b-lg mb-4 gap-3 flex flex-row items-center ${isDetail ? "justify-start" : "justify-between"}`}
    >
      {isDetail && (
        <Pressable onPress={handleRightButton}>
          <Feather name="arrow-left" size={24} />
        </Pressable>
      )}

      <Heading className="text-2xl font-extrabold text-[#2DD4BF]">
        {label}
      </Heading>
    </Box>
  );
}
