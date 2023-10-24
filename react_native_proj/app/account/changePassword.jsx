import { Stack, useRouter } from "expo-router";
import React from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Text,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import { COLORS, FONT, SIZES } from "../../constants";

const ChangePassword = () => {
  const router = useRouter();

  const dataRender = [
    {
      id: 0,
      title: "Email",
      key: "email",
      editable: false,
      value: "",
    },
    {
      id: 1,
      title: "Old Password",
      key: "oldPassword",
      editable: true,
      value: "",
    },
    {
      id: 2,
      title: "New Password",
      key: "newPassword",
      editable: true,
      value: "",
    },
    {
      id: 3,
      title: "Confirm Password",
      key: "confirmPassword",
      editable: true,
      value: "",
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F2F2F2' }}>
      <Stack.Screen
        options={{
          headerShown: true,
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back("/account")}>
              <Ionicons name="arrow-back-outline" size={25} />
            </TouchableOpacity>
          ),
          headerTitle: () => (
            <Text style={{ fontFamily: FONT.bold, fontSize: SIZES.large }}>
              Change password
            </Text>
          ),
        }}
      />
      <View style={styles.formContainer}>
        {dataRender.map((item) => (
          <View style={styles.formItem} key={item.id}>
            <Text style={styles.itemTitle}>{item.title}</Text>
            <TextInput
              style={styles.itemInput(item.editable)}
              key={item.key}
              value={item.value}
              editable={item.editable}
            />
          </View>
        ))}
      </View>
      <View style={styles.bottomButton}>
        <TouchableOpacity onPress={() => router.back("/account")} style={[styles.button, { backgroundColor: "#fff" }]}>
          <Text style={[styles.buttonText, { color: COLORS.tertiary }]}>
            Cancel
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: COLORS.tertiary }]}
        >
          <Text style={[styles.buttonText, { color: "#fff" }]}>Save</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    width: "92%",
    marginLeft: "4%",
    paddingHorizontal: 10,
    paddingVertical: 20,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: '#fff',
    marginTop: 20
  },
  formItem: {
    width: '100%',
    marginBottom: 10
  },
  itemTitle: {
    fontFamily: FONT.bold,
    fontSize: SIZES.medium,
    marginBottom: 7,
  },
  itemInput: (editable) => ({
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 1,
    borderWidth: 1,
    borderColor: COLORS.gray2,
    backgroundColor: editable ? '#fff' : '#ECECEC'
  }),
  bottomButton: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 15,
    paddingVertical: 12,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#fff'
  },
  button: {
    borderRadius: 20,
    height: 40,
    width: '48%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.tertiary,
  },
  buttonText: {
    fontFamily: FONT.medium,
    fontSize: SIZES.medium,
  },
});

export default ChangePassword;
