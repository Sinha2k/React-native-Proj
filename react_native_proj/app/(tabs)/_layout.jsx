import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { useAuth } from "../context/AuthContext";

import { COLORS } from "../../constants";

export default () => {
  const { authState } = useAuth();

  return (
    <ActionSheetProvider>
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

        {authState.user?.role?.data.attributes?.name === "EmployerCompany" ? (
          <Tabs.Screen
            options={{
              headerShown: false,
              tabBarActiveTintColor: COLORS.tertiary,
              tabBarLabel: "Add Job",
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
        ) : (
          <Tabs.Screen
            options={{
              headerShown: false,
              tabBarActiveTintColor: COLORS.tertiary,
              tabBarLabel: "Add Job",
              tabBarIcon: ({ focused }) => {
                return (
                  <Ionicons
                    name={`${focused ? "add-circle" : "add-circle-outline"}`}
                    color={focused ? COLORS.tertiary : COLORS.gray}
                    size={24}
                  />
                );
              },
              href: null,
            }}
            name="addJob"
          />
        )}
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
    </ActionSheetProvider>
  );
};
