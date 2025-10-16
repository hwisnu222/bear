import { useState, useEffect, createContext, useContext } from "react";
import {
  ScrollView,
  StyleSheet,
  TextInput,
  View,
  Text,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StorageContext } from "./_layout";
import { LocalStorage, storageType } from "@/utils/localStorage";
import NotFound from "@/components/NotFound";

const localStorage = new LocalStorage();

export default function HomeScreen() {
  const { copiedText, storages, setStorages } = useContext(StorageContext);
  const [search, setSearch] = useState<string | null>("");

  const handleChangeInput = (text: string) => {
    setSearch("");
  };

  const handleRemoveLink = async (link: string) => {
    await localStorage.removeLink(link);
    const r = await localStorage.getStorage();
    setStorages(r);
  };

  return (
    <>
      <View style={styles.parent}>
        <View style={styles.container}>
          <View>
            <TextInput
              placeholder="Search.1.."
              style={styles.input}
              placeholderTextColor="#c2c2c2"
              onChangeText={handleChangeInput}
            />
          </View>

          <Text style={styles.title}>Links</Text>
          <ScrollView>
            {!!storages?.length && (
              <View style={styles.lists}>
                {storages?.map((item: storageType, idx: number) => (
                  <View key={idx} style={styles.list}>
                    <Text style={styles.subtitleList} numberOfLines={1}>
                      {item?.link}
                    </Text>
                    <Pressable
                      onPress={async () => handleRemoveLink(item.link)}
                    >
                      <Feather name="trash" size={20} color="#c2c2c2" />
                    </Pressable>
                  </View>
                ))}
              </View>
            )}

            {!storages?.length && <NotFound />}
          </ScrollView>
          {/* <TouchableOpacity style={styles.buttonCopy}> */}
          {/*   <Text style={styles.labelButton}>Copy</Text> */}
          {/* </TouchableOpacity> */}
        </View>
      </View>

      <Text style={styles.copiedPreview}>{copiedText}</Text>
    </>
  );
}

const styles = StyleSheet.create({
  parent: {
    backgroundColor: "#ffffff",
    display: "flex",
    flex: 1,
  },
  titleHeader: {
    fontWeight: 700,
    fontSize: 18,
    color: "#8b2fc9",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    padding: 8,
    flex: 1,
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    padding: 14,
    borderRadius: 6,
  },
  input: {
    backgroundColor: "#f2f2f2",
    borderRadius: 6,
    padding: 14,
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
  },
  subtitleList: {
    color: "#c2c2c2",
    flex: 1,
    marginRight: 10,
  },
  fab: {
    position: "fixed",
    bottom: 4,
    right: 4,
  },
  buttonCopy: {
    backgroundColor: "#7b2cbf",
    borderRadius: 6,
    padding: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  labelButton: {
    color: "white",
    fontWeight: 600,
  },
  copiedPreview: {
    backgroundColor: "#f2f2f2",
    paddingVertical: 1,
    paddingHorizontal: 3,
  },
});
