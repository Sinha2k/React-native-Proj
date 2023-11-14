import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { useCallback, useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { RootSiblingParent } from "react-native-root-siblings";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";

SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  // Ensure any route can link back to `/`
  initialRouteName: "home",
};

const Layout = () => {
  const [fontsLoaded] = useFonts({
    DMBold: require("../assets/fonts/DMSans-Bold.ttf"),
    DMMedium: require("../assets/fonts/DMSans-Medium.ttf"),
    DMRegular: require("../assets/fonts/DMSans-Regular.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  const { authState } = useAuth();

  if (!fontsLoaded) return null;

  return (
    <Provider store={store}>
      <Stack onLayout={onLayoutRootView}>
        <Stack.Screen
          options={{ headerShown: false, gestureEnabled: false }}
          name="presentation"
        />
        {!authState.authenticated ? (
          <Stack.Screen
            options={{ headerShown: false, gestureEnabled: false }}
            name="(auth)"
          />
        ) : authState.user?.role?.data.id == 1 ? (
          <Stack.Screen
            options={{ headerShown: false, gestureEnabled: false }}
            name="role_permission"
          />
        ) : authState.user?.role?.data.attributes.name === "Employer" ? (
          <Stack.Screen
            options={{ headerShown: false, gestureEnabled: false }}
            name="createCompany"
          />
        ) : (
          <Stack.Screen
            options={{ headerShown: false, gestureEnabled: false }}
            name="(tabs)"
          />
        )}
        <Stack.Screen name="(modal)/map" />
      </Stack>
    </Provider>
  );
};

const App = () => {
  return (
    <RootSiblingParent>
      <AuthProvider>
        <ActionSheetProvider>
          <Layout />
        </ActionSheetProvider>
      </AuthProvider>
    </RootSiblingParent>
  );
};

export default App;
