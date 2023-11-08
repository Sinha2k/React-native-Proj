import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Image, Text, Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const Skeleton = ({ style, width }) => {
  const translateX = useRef(new Animated.Value(-width)).current;

  useEffect(() => {
    Animated.loop(
        Animated.timing(translateX, {
            toValue: width,
            useNativeDriver: true,
            duration: 1000
        })
    ).start()
  }, [width])

  return (
    <View
      style={
        // {width: width, height: height, backgroundColor: "rgba(0, 0, 0, 0.12)"},
        [style, { width: width, overflow: "hidden", backgroundColor: "rgba(0, 0, 0, 0.05)" }]
      }
    >
      <Animated.View
        style={{
          width: "100%",
          height: "100%",
          transform: [{ translateX: translateX }],
        }}
      >
        <LinearGradient
          style={{ width: "100%", height: "100%" }}
          colors={["transparent", "rgba(0, 0, 0, 0.05)", "transparent"]}
          start={{ x: 1, y: 1 }}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Skeleton;
