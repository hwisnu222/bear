import { View, StyleSheet } from "react-native";
import { Text } from "./ui/text";

export default function NotFound() {
  return (
    <View style={styles.container}>
      <Text className="text-gray-600">Item is not found</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});
