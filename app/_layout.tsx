import { createContext, useState, useEffect } from "react";
import { useRouter } from "expo-router";
import "react-native-reanimated";

import { Drawer } from "expo-router/drawer";
import { Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import { LocalStorage, storageType } from "@/utils/localStorage";

import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import '@/global.css';

export const unstable_settings = {
  anchor: "(tabs)",
};

// export default function RootLayout() {
//   const colorScheme = useColorScheme();
//
//   return (

    <GluestackUIProvider mode="dark">
      //     <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
//       <Stack initialRouteName="drawer">
//         {/* <Stack.Screen name="(tabs)" options={{ headerShown: false }} /> */}
//         <Stack.Screen name="drawer" options={{ headerShown: false }} />
//         <Stack.Screen
//           name="modal"
//           options={{ presentation: "modal", title: "Modal" }}
//         />
//       </Stack>
//       <StatusBar style="auto" />
//     </ThemeProvider>
//   );
// }
//

export const StorageContext = createContext({
  copiedText: "",
  storages: null,
});

const localStorage = new LocalStorage();

export default function Layout() {
  const router = useRouter();
  const [copiedText, setCopiedText] = useState("");
  const [storages, setStorages] = useState<storageType[] | null>(null);

  const fetchCopiedText = async () => {
    const text = await Clipboard.getStringAsync();
    setCopiedText(text);
    console.log(text
    </GluestackUIProvider>
  );
  };

  const addItemToStorage = async () => {
    console.log("process add item");
    console.log(`cp: ${copiedText}`);
    if (copiedText) {
      const r = await localStorage.addItem(copiedText);
      if (r) {
        console.log("add item success");

        const s = await localStorage.getStorage();
        setStorages(s);
      }
      return;
    }

    console.log("failed add item");
  };

  useEffect(() => {
    fetchCopiedText();
  }, []);

  return (
    <>
      <StorageContext.Provider value={{ copiedText, storages, setStorages }}>
        {Clipboard.isPasteButtonAvailable && (
          <Clipboard.ClipboardPasteButton onPress={fetchCopiedText} />
        )}
        <Drawer
          screenOptions={{
            headerShadowVisible: false,
            headerTitleAlign: "center",
            headerTitle: "Bear",
          }}
        >
          <Drawer.Screen
            name="index" // This is the name of the page and must match the url from root
            options={{
              drawerLabel: "Home",
              title: "Home",
              headerRight: () => (
                <>
                  <Pressable
                    style={{ marginRight: 16 }}
                    onPress={async () => await localStorage.resetStorage()}
                  >
                    <Feather name="refresh-cw" size={24} />
                  </Pressable>

                  <Pressable
                    style={{ marginRight: 16 }}
                    onPress={fetchCopiedText}
                  >
                    <Feather name="refresh-cw" size={24} />
                  </Pressable>
                  <Pressable
                    style={{ marginRight: 16 }}
                    onPress={addItemToStorage}
                  >
                    <Feather name="plus" size={24} />
                  </Pressable>
                </>
              ),
            }}
          />
          <Drawer.Screen
            name="add" // This is the name of the page and must match the url from root
            options={{
              drawerLabel: "Add link",
              title: "overview",
              drawerItemStyle: { display: "none" },
              headerLeft: () => (
                <Pressable onPress={() => router.back()}>
                  <Feather name="arrow-left" size={24} />
                </Pressable>
              ),
            }}
          />
          <Drawer.Screen
            name="settings" // This is the name of the page and must match the url from root
            options={{
              drawerLabel: "Settings",
              title: "Settings",
              headerLeft: () => (
                <Pressable onPress={() => router.back()}>
                  <Feather name="arrow-left" size={24} />
                </Pressable>
              ),
            }}
          />

          <Drawer.Screen
            name="(tabs)"
            options={{
              drawerItemStyle: { display: "none" },
            }}
          />

          <Drawer.Screen
            name="modal"
            options={{
              drawerItemStyle: { display: "none" },
            }}
          />
        </Drawer>
      </StorageContext.Provider>
    </>
  );
}
