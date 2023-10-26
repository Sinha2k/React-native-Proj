import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FONT } from "../../../constants";
import { useRouter } from "expo-router";
import ModalDialog from "../../utils/modal/modalDialog";

const data = [
  {
    id: 0,
    title: "Change password",
    icon: "key-outline",
    link: "/account/changePassword",
  },
  {
    id: 1,
    title: "Security Setting",
    icon: "shield-checkmark-outline",
    link: "/account/changePassword",
  },
  {
    id: 2,
    title: "Email Notify Setting",
    icon: "mail-unread-outline",
    link: "/account/changePassword",
  },
  {
    id: 3,
    title: "Counteract Account",
    icon: "lock-closed-outline",
    link: "/account/changePassword",
  },
];

const Settings = () => {

    const router = useRouter()

    const [visible, setVisible] = useState(false)

  return (
    <View style={{ marginTop: 5 }}>
      {data.map((item) => {
        return (
          <TouchableOpacity onPress={() => router.push(item.link)} style={styles.listItem} key={item.id}>
            <View style={styles.itemLeft}>
              <Ionicons name={item.icon} size={20} />
              <Text style={styles.textItem}>{item.title}</Text>
            </View>
            <Ionicons name="chevron-forward-outline" size={20} />
          </TouchableOpacity>
        );
      })}
      <TouchableOpacity onPress={() => setVisible(true)}>
        <View
            style={{
            width: "100%",
            paddingVertical: 15,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            }}
        >
            <Text style={{ fontFamily: FONT.medium, marginRight: 10 }}>Logout</Text>
            <Ionicons name="log-out-outline" size={25} />
        </View>
      </TouchableOpacity>
      <ModalDialog visible={visible} setVisible={setVisible} />
    </View>
  );
};

const styles = StyleSheet.create({
  listItem: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingVertical: 15,
    borderBottomColor: "#ECECEC",
    borderBottomWidth: 1,
    backgroundColor: "#fff",
  },
  itemLeft: {
    display: "flex",
    flexDirection: "row",
  },
  textItem: {
    fontFamily: FONT.medium,
    marginLeft: 15,
  },
});

export default Settings;
