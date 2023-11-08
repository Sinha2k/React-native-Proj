import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";

import styles from "./style";
import { COLORS, FONT } from "../../constants";
import { showToast, useAuth } from "../context/AuthContext";

const dataInput = [
  {
    key: "email",
    title: "Enter your email",
    icon: "mail-outline",
    isPassword: false,
  },
  {
    key: "password",
    title: "Enter your password",
    icon: "lock-closed-outline",
    isPassword: true,
  },
];

const dataLogo = [
  {
    name: "Facebook",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1200px-Facebook_Logo_%282019%29.png",
    link: "http://192.168.11.106:1337/api/connect/facebook",
  },
  {
    name: "Google",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/800px-Google_%22G%22_Logo.svg.png",
    link: "http://192.168.11.106:1337/api/connect/google",
  },
  {
    name: "Apple",
    image: "https://pngfre.com/wp-content/uploads/apple-logo-6-1024x1024.png",
    link: "http://192.168.11.106:1337/api/connect/apple",
  },
];

const Login = () => {
  const [hide, setHide] = useState(false);

  const [accountData, setAccountData] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();

  const {authState, onLogin} = useAuth()

  const loginSubmit = async (account) => {
    Keyboard.dismiss();
    if (account.email && account.password) {
      await onLogin(account)
    } else {
      showToast("You must enter full fields", "#FEAB21")
    }
  };

  const renderIconStatus = (value) => {
    switch (value) {
      case "loading":
        return (
          <ActivityIndicator
            style={{ marginRight: 5 }}
            color={"#fff"}
            size={"small"}
          />
        );
      case "success":
        return (
          <Ionicons
            style={{ marginRight: 5 }}
            color="#fff"
            name="checkmark-circle-outline"
            size={20}
          />
        );
      case "error":
        return (
          <Ionicons
            style={{ marginRight: 5 }}
            color="red"
            name="close-circle-outline"
            size={20}
          />
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.headerText}>Login</Text>
        {dataInput.map((item) => (
          <View style={styles.textInputContainer} key={item.key}>
            <Ionicons style={styles.textInputIcon} name={item.icon} size={25} />
            <TextInput
              placeholderTextColor={COLORS.gray2}
              style={styles.textInput}
              placeholder={item.title}
              value={accountData[item.key]}
              onChangeText={(value) =>
                setAccountData({ ...accountData, [item.key]: value })
              }
              secureTextEntry={item.key === "password" && !hide}
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
        <View style={styles.fotgetContainer}>
          <Text style={styles.forgetText}>Forget password?</Text>
        </View>
        <TouchableOpacity
          onPress={() => loginSubmit(accountData)}
          style={styles.buttonContainer}
        >
          {renderIconStatus(authState.status)}
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <View style={styles.orLoginContainer}>
          <View style={styles.line}></View>
          <Text style={styles.orLoginText}>Or login with</Text>
        </View>
        <View style={styles.logoContainer}>
          {dataLogo.map((item) => (
            <TouchableOpacity
              onPress={() => router.push(item.link)}
              style={styles.logoItem}
              key={item.name}
            >
              <Image
                source={{ uri: item.image }}
                height={40}
                width={40}
                resizeMode="contain"
              />
            </TouchableOpacity>
          ))}
        </View>
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
            Don't you have account yet?
          </Text>
          <Text
            style={{ fontFamily: FONT.medium, color: COLORS.tertiary }}
            onPress={() => router.push("/signup")}
          >
            Sign up now
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;
