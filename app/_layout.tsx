import { Stack } from "expo-router";
import "react-native-reanimated";

import { StatusBar, useColorScheme } from "react-native";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/global.css";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaProvider>
      <GluestackUIProvider mode="light">
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="settings" options={{ headerShown: false }} />
            <Stack.Screen
              name="modal"
              options={{ presentation: "modal", title: "Modal" }}
            />
          </Stack>
          <StatusBar />
        </ThemeProvider>
      </GluestackUIProvider>
    </SafeAreaProvider>
  );
}

// export default function Layout() {
//   const router = useRouter();
//   const [copiedText, setCopiedText] = useState("");
//   const [storages, setStorages] = useState<storageType[] | null>(null);
//
//   const fetchCopiedText = async () => {
//     const text = await Clipboard.getStringAsync();
//     setCopiedText(text);
//     console.log(text);
//   };
//
//
//   return (
//     <>
//       <GluestackUIProvider mode="dark">
//         <StorageContext.Provider value={{ copiedText, storages, setStorages }}>
//           {Clipboard.isPasteButtonAvailable && (
//             <Clipboard.ClipboardPasteButton onPress={fetchCopiedText} />
//           )}
//           <Drawer
//             screenOptions={{
//               headerShadowVisible: false,
//               headerTitleAlign: "center",
//               headerTitle: "Bear",
//             }}
//           >
//             <Drawer.Screen
//               name="index" // This is the name of the page and must match the url from root
//               options={{
//                 drawerLabel: "Home",
//                 title: "Home",
//                 headerRight: () => (
//                   <>
//                     <Pressable
//                       style={{ marginRight: 16 }}
//                       onPress={fetchCopiedText}
//                     >
//                       <Feather name="refresh-cw" size={24} />
//                     </Pressable>
//                   </>
//                 ),
//               }}
//             />
//             <Drawer.Screen
//               name="add" // This is the name of the page and must match the url from root
//               options={{
//                 drawerLabel: "Add link",
//                 title: "overview",
//                 drawerItemStyle: { display: "none" },
//                 headerLeft: () => (
//                   <Pressable onPress={() => router.back()}>
//                     <Feather name="arrow-left" size={24} />
//                   </Pressable>
//                 ),
//               }}
//             />
//             <Drawer.Screen
//               name="settings" // This is the name of the page and must match the url from root
//               options={{
//                 drawerLabel: "Settings",
//                 title: "Settings",
//                 headerLeft: () => (
//                   <Pressable onPress={() => router.back()}>
//                     <Feather name="arrow-left" size={24} />
//                   </Pressable>
//                 ),
//               }}
//             />
//
//             <Drawer.Screen
//               name="(tabs)"
//               options={{
//                 drawerItemStyle: { display: "none" },
//               }}
//             />
//
//             <Drawer.Screen
//               name="modal"
//               options={{
//                 drawerItemStyle: { display: "none" },
//               }}
//             />
//           </Drawer>
//         </StorageContext.Provider>
//       </GluestackUIProvider>
//     </>
//   );
// }
