import { Box } from "@/components/ui/box";
import { NativeTabs, Icon, Label } from "expo-router/unstable-native-tabs";
import { Text } from "react-native";
import { Tabs } from "expo-router";
import { Feather } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#581c87",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Feather name="home" color={color} size={18} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => (
            <Feather name="settings" color={color} size={18} />
          ),
          headerBackButtonDisplayMode: "minimal",
          headerShown: true,
        }}
      />
    </Tabs>
  );
}

{
  /* <Box className="relative w-96 bottom-2 bg-red-500"> */
}
{
  /*   <Text>bottom</Text> */
}
{
  /*   <NativeTabs> */
}
{
  /*     <NativeTabs.Trigger name="index"> */
}
{
  /*       <Label>Home</Label> */
}
{
  /*       <Icon sf="house.fill" drawable="custom_android_drawable" /> */
}
{
  /*     </NativeTabs.Trigger> */
}
{
  /*     <NativeTabs.Trigger name="settings"> */
}
{
  /*       <Icon sf="gear" drawable="custom_settings_drawable" /> */
}
{
  /*       <Label>Settings</Label> */
}
{
  /*     </NativeTabs.Trigger> */
}
{
  /*   </NativeTabs> */
}
{
  /* </Box> */
}
