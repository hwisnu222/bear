import { Tabs } from "expo-router";
import { Feather } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#2DD4BF",

        tabBarInactiveTintColor: "#9CA3AF",

        tabBarStyle: {
          backgroundColor: "#0f172a",
          borderTopWidth: 0,
          elevation: 10,
          shadowColor: "#000",
        },

        headerStyle: {
          backgroundColor: "#1F2937",
        },
        headerTintColor: "#E5E7EB",
        headerTitleStyle: {
          fontWeight: "bold",
        },
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
