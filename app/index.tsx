import { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  TextInput,
  View,
  Text,
  Pressable,
  Linking,
  Alert,
  RefreshControl,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import { LocalStorage, storageType } from "@/utils/localStorage";
import NotFound from "@/components/NotFound";
import { Fab } from "@/components/ui/fab";
import { Box } from "@/components/ui/box";
import AppBar from "@/components/AppBar";
import { SafeAreaView } from "react-native-safe-area-context";
import { Heading } from "@/components/ui/heading";
import { Card } from "@/components/ui/card";
import { HStack } from "@/components/ui/hstack";

const localStorage = new LocalStorage();

export default function HomeScreen() {
  const [stateStorages, setStateStorages] = useState([]);
  const [isRefresh, setIsRefresh] = useState(false);

  const handleChangeInput = async (text: string) => {
    if (!text) {
      setStateStorages(storages);
      return;
    }
    const r = await localStorage.searchLink(text);
    setStateStorages(r);
  };

  const handleOpenLink = async (link: string) => {
    const isSupport = await Linking.canOpenURL(link);

    if (isSupport) {
      await Linking.openURL(link);
      return;
    }

    Alert.alert("Link not supported");
  };

  const handleRemoveLink = async (link: string) => {
    Alert.alert(
      "Confimation to delete", // Judul Alert
      "Do you want to delete this link?", // Pesan Body
      [
        {
          text: "Cancel",
          onPress: () => console.log("Delete is canceled"),
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: async () => {
            await localStorage.removeLink(link);
            const r = await localStorage.getStorage();
            setStateStorages(r);
          },
          style: "destructive",
        },
      ],
      { cancelable: false },
    );
  };

  const handleRefresh = async () => {
    setIsRefresh(true);
    const r = await localStorage.getStorage();

    setStateStorages(r);
    setIsRefresh(false);
  };

  const getStateStorages = async () => {
    const r = await localStorage.getStorage();
    setStateStorages(r);
  };

  const addItemToStorage = async () => {
    const text = await Clipboard.getStringAsync();

    if (text) {
      const r = await localStorage.addItem(text);
      if (r) {
        console.log("add item success");

        const s = await localStorage.getStorage();
        setStateStorages(s);
        Alert.alert("Add link", "Link is added");
      }
      return;
    }

    console.log("failed add item");
  };

  useEffect(() => {
    getStateStorages();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ebeaf0" }}>
      <AppBar />
      <View style={styles.container}>
        <Box className="mb-4">
          <TextInput
            placeholder="Search..."
            style={styles.input}
            placeholderTextColor="#c2c2c2"
            onChangeText={handleChangeInput}
          />
        </Box>

        <HStack className="gap-4 mb-4">
          <Card className="rounded-xl w-full bg-purple-900">
            <Box className="gap-2 flex justify-start items-start">
              <Box className="rounded-full p-2 bg-purple-100">
                <Feather name="link" size={24} />
              </Box>
              <Box className="ml-1">
                <Text className="font-bold text-2xl text-white">
                  {stateStorages?.length}
                </Text>
                <Text className="text-white">Bookmarks</Text>
              </Box>
            </Box>
          </Card>
          {/* <Card className="shadow"> */}
          {/*   <Box className="gap-2 flex justify-start items-start w-auto"> */}
          {/*     <Box className="rounded-full bg-gray-200 p-2"> */}
          {/*       <Feather name="link" size={24} /> */}
          {/*     </Box> */}
          {/*     <Text className="font-bold">12</Text> */}
          {/*     <Text>Bookmarks</Text> */}
          {/*   </Box> */}
          {/* </Card> */}
        </HStack>
        <Heading className="text-md font-bold ">Bookmarks</Heading>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={isRefresh} // status loading
              onRefresh={handleRefresh} // fungsi refresh
              // (Opsional) Sesuaikan warna loader (hanya di Android)
              colors={["#9bc9e3"]}
              // (Opsional) Sesuaikan warna latar belakang loader (hanya di iOS)
              tintColor="#9bc9e3"
            />
          }
        >
          {!!stateStorages?.length && (
            <View style={styles.lists}>
              {stateStorages?.map((item: storageType, idx: number) => (
                <Pressable onPress={() => handleOpenLink(item.link)} key={idx}>
                  <View style={styles.list}>
                    <Feather name="link" size={18} color="#c2c2c2" />
                    <Text style={styles.subtitleList} numberOfLines={2}>
                      {item?.link}
                    </Text>
                    <Pressable
                      onPress={async () => handleRemoveLink(item.link)}
                    >
                      <Feather name="trash" size={20} color="#c2c2c2" />
                    </Pressable>
                  </View>
                </Pressable>
              ))}
            </View>
          )}

          {!stateStorages?.length && (
            <Box className="p-4">
              <NotFound />
            </Box>
          )}
        </ScrollView>
        {/* <TouchableOpacity style={styles.buttonCopy}> */}
        {/*   <Text style={styles.labelButton}>Copy</Text> */}
        {/* </TouchableOpacity> */}
        <Fab size="lg" placement="bottom right" className="bg-purple-900">
          <Pressable onPress={addItemToStorage}>
            <Feather name="plus" size={24} color="#ffffff" />
          </Pressable>
        </Fab>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleHeader: {
    fontWeight: 700,
    fontSize: 18,
    color: "#8b2fc9",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    flex: 1,
    padding: 10,
  },

  input: {
    backgroundColor: "#ffffff",
    borderRadius: 6,
    padding: 20,
    marginVertical: 4,
    outline: "#8b2fc9",
  },
  title: {
    fontWeight: 700,
  },
  lists: {
    display: "flex",
    gap: 6,
    paddingBottom: 30,
  },
  list: {
    // borderColor: "#000000",
    // borderWidth: 1,
    borderRadius: 6,
    padding: 8,
    backgroundColor: "#ffffff",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 6,
  },
  subtitleList: {
    flex: 1,
    marginRight: 10,
  },
  fab: {
    position: "fixed",
    bottom: 4,
    right: 4,
  },

  copiedPreview: {
    backgroundColor: "#f2f2f2",
    paddingVertical: 1,
    paddingHorizontal: 3,
  },
});
