import AppBar from "@/components/AppBar";
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { LocalStorage } from "@/utils/localStorage";
import { Alert, Pressable, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Card } from "@/components/ui/card";

const localStorage = new LocalStorage();

export default function TabTwoScreen() {
  const handleRemoveStorage = () => {
    Alert.alert(
      "Confimation to rest", // Judul Alert
      "Do you want to reset storage?", // Pesan Body
      [
        {
          text: "Cancel",
          onPress: () => console.log("Reset is canceled"),
          style: "cancel",
        },
        {
          text: "Reset",
          onPress: async () => {
            localStorage.resetStorage();
          },
          style: "destructive",
        },
      ],
      { cancelable: false },
    );
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ebeaf0" }}>
      <View style={styles.parent}>
        <AppBar isDetail={true} label="Settings" />
        <Box className="p-4">
          <VStack className="mb-8">
            <Text style={styles.title}>Import / Export Data</Text>
            <Card className="rounded-xl">
              <Box className="p-4">
                <Text>Import</Text>
              </Box>
              <Box className="p-4">
                <Text>Export</Text>
              </Box>
            </Card>
          </VStack>

          <VStack className="mb-8">
            <Text style={styles.title}>Storage</Text>

            <Card className="rounded-xl">
              <Pressable onPress={handleRemoveStorage}>
                <Box className="p-4">
                  <Text className="text-red-500">Reset all data</Text>
                </Box>
              </Pressable>
            </Card>
          </VStack>
        </Box>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
  container: {
    padding: 2,
  },

  title: {
    fontWeight: 600,
    marginBottom: 4,
  },
});
