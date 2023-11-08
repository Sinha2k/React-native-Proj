import React from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
  Dimensions,
} from "react-native";
import { FONT, SIZES } from "../../../constants";

const { width, height } = Dimensions.get("screen");

const Loading = () => {
  return (
    <View style={styles.container}>
      <View style={styles.loadingContainer}>
        <ActivityIndicator size={20} color={"#fff"} />
        <Text style={styles.textLoading}>Loading...</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingContainer: {
    padding: 20,
    backgroundColor: "#2B2B2B",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 5
  },
  textLoading: {
    fontFamily: FONT.medium,
    fontSize: SIZES.medium,
    color: "#fff",
    marginTop: 5
  },
});

export default Loading;
