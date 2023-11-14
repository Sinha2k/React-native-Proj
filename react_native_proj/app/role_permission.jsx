import React, { useEffect, useState } from "react";
import { SafeAreaView, TouchableOpacity, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useDispatch } from "react-redux";
import axios from "axios";

import styles from "./(auth)/style";
import { useAuth } from "./context/AuthContext";
import { createEmployee } from "../redux/reducer/employeeSliceReducer";
import { createEmployer } from "../redux/reducer/employerSliceReducer";

const RolePermission = () => {
  const { authState, updateRole, setRoleData } = useAuth();

  const [roles, setRoles] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    const getRoles = async() => {
      try {
        const res = await axios.get('https://72cb-27-69-6-204.ngrok-free.app/api/users-permissions/roles');
        setRoles(res.data.roles)
        setRoleData(res.data.roles)
      } catch (err) {
        console.log(err.response);
      }
    }
    getRoles()
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>You're</Text>
      <TouchableOpacity
        onPress={async () => {
          await updateRole({ userId: authState.user.id, role: roles?.find(item => item.name === "Employer").id });
          dispatch(createEmployer(authState.user.id))
        }}
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
          await updateRole({ userId: authState.user.id, role: roles?.find(item => item.name === "Employee").id })
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
