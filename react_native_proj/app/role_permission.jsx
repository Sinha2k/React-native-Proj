import React from "react";
import { SafeAreaView, TouchableOpacity, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useDispatch } from "react-redux";

import styles from "./(auth)/style";
import { useAuth } from "./context/AuthContext";
import { createEmployee } from "../redux/reducer/employeeSliceReducer";

const RolePermission = () => {
  const { authState, updateRole } = useAuth();

  const dispatch = useDispatch()

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>You're</Text>
      <TouchableOpacity
        onPress={() => updateRole({ userId: authState.user.id, role: 4 })}
        style={styles.buttonContainer}
      >
        <Ionicons
          style={{ marginRight: 10 }}
          name="business"
          color={"#fff"}
          size={25}
        />
        <Text style={styles.buttonText}>Employer</Text>
      </TouchableOpacity>
      <Text style={{ marginTop: 10 }}>or</Text>
      <TouchableOpacity
        onPress={async () => {
          await updateRole({ userId: authState.user.id, role: 3 })
          dispatch(createEmployee(authState.user.id))
        }}
        style={styles.buttonContainer}
      >
        <Ionicons
          style={{ marginRight: 10 }}
          name="people"
          color={"#fff"}
          size={25}
        />
        <Text style={styles.buttonText}>Employee</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default RolePermission;
