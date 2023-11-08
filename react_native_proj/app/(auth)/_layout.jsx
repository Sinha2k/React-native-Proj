import { Stack } from "expo-router";
import React from "react";
import { View, StyleSheet } from "react-native";

export default () => {
  return (
    <Stack>
      <Stack.Screen
        options={{ headerShown: false, gestureEnabled: false }}
        name="login"
      />
      <Stack.Screen
        options={{ headerShown: false, gestureEnabled: false }}
        name="signup"
      />
    </Stack>
  );
};

