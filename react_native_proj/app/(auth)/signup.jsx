import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import Toast from "react-native-root-toast";
import { useRouter } from "expo-router";

import styles from "./style";
import { COLORS, FONT } from "../../constants";
import { showToast, useAuth } from "../context/AuthContext";

const dataInput = [
  {
    key: "username",
    title: "Enter your full name",
    icon: "person-outline",
    isPassword: false,
    textType: "name",
  },
  {
    key: "email",
    title: "Enter your email",
    icon: "mail-outline",
    isPassword: false,
    textType: "emailAddress",
  },
  {
    key: "password",
    title: "Enter your password",
    icon: "lock-closed-outline",
    isPassword: true,
    textType: "password",
  },
  {
    key: "confirmPassword",
    title: "Confirm your password",
    icon: "lock-closed-outline",
    isPassword: true,
    textType: "password",
  },
];

const Signup = () => {
  const [hide, setHide] = useState(false);

  const [accountData, setAccountData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const router = useRouter();

  const {onRegister, authState} = useAuth()

  const signupSubmit = (bodyData) => {
    let check = Object.keys(bodyData).map(key => bodyData[key])
    if (check) {
      if(bodyData["password"] !== bodyData["confirmPassword"]) {
        showToast("Password and comfirmPassword don't match", "#FEAB21")
      } else {
        console.log(bodyData);
        onRegister(bodyData)
      }
    } else {
      showToast("You must enter full fields", "#FEAB21")
    }
  }

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.container}>
            <Text style={styles.headerText}>Signup</Text>
            {dataInput.map((item) => (
              <View style={styles.textInputContainer} key={item.key}>
                <Ionicons style={styles.textInputIcon} name={item.icon} size={25} />
                <TextInput
                  placeholderTextColor={COLORS.gray2}
                  style={styles.textInput}
                  placeholder={item.title}
                  value={accountData[item.key]}
                  textContentType={item.textType}
                  onChangeText={(value) =>
                    setAccountData({ ...accountData, [item.key]: value })
                  }
                  secureTextEntry={(item.key === "password" || item.key === "confirmPassword") && !hide}
                />
                {item.isPassword && (
                  <Ionicons
                    size={25}
                    style={{
                      position: "absolute",
                      top: 20,
                      right: 15,
                      opacity: 0.2,
                    }}
                    onPress={() => setHide(!hide)}
                    name={hide ? "eye-outline" : "eye-off-outline"}
                  />
                )}
              </View>
            ))}
            <TouchableOpacity
              onPress={() => signupSubmit(accountData)}
              style={styles.buttonContainer}
            >
              <Text style={styles.buttonText}>Signup</Text>
            </TouchableOpacity>

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 25,
              }}
            >
              <Text style={{ fontFamily: FONT.medium, marginRight: 5 }}>
                Do you have account allready?
              </Text>
              <Text
                style={{ fontFamily: FONT.medium, color: COLORS.tertiary }}
                onPress={() => router.push("/login")}
              >
                Login now
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Signup;
