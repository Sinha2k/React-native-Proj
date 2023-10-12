import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

import { COLORS } from "../../constants";

export default () => {
  return (
    <Tabs>
      <Tabs.Screen
        options={{
          headerShown: false,
          tabBarActiveTintColor: COLORS.tertiary,
          tabBarLabel: "Home",
          tabBarIcon: ({ focused }) => {
            return (
              <Ionicons
                name={`${focused ? "home" : "home-outline"}`}
                color={focused ? COLORS.tertiary : COLORS.gray}
                size={24}
              />
            );
          },
        }}
        name="home"
      />
      <Tabs.Screen
        options={{
          headerShown: false,
          tabBarActiveTintColor: COLORS.tertiary,
          tabBarLabel: "AllJob",
          tabBarIcon: ({ focused }) => {
            return (
              <Ionicons
                name={`${focused ? "list" : "list-outline"}`}
                color={focused ? COLORS.tertiary : COLORS.gray}
                size={24}
              />
            );
          },
        }}
        name="allJob"
      />
      <Tabs.Screen
        options={{
          headerShown: false,
          tabBarActiveTintColor: COLORS.tertiary,
          tabBarLabel: "Add",
          tabBarIcon: ({ focused }) => {
            return (
              <Ionicons
                name={`${focused ? "add-circle" : "add-circle-outline"}`}
                color={focused ? COLORS.tertiary : COLORS.gray}
                size={24}
              />
            );
          },
        }}
        name="addJob"
      />
      <Tabs.Screen
        options={{
          headerShown: false,
          tabBarActiveTintColor: COLORS.tertiary,
          tabBarLabel: "Account",
          tabBarIcon: ({ focused }) => {
            return (
              <Ionicons
                name={`${focused ? "person" : "person-outline"}`}
                color={focused ? COLORS.tertiary : COLORS.gray}
                size={24}
              />
            );
          },
        }}
        name="account"
      />
    </Tabs>
  );
};
