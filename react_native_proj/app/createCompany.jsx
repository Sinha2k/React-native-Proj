import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, router } from "expo-router";
import axios from "axios";

import { COLORS, FONT } from "../constants";
import Loading from "../components/utils/loading/loading";
import { showToast, useAuth } from "./context/AuthContext";

const CreateCompany = () => {
  const employerId = useSelector((state) => state.employer.employerId);

  const { companyAddress, setCompanyAddress, roleData, updateRole, authState } =
    useAuth();

  const [loading, setLoading] = useState(false)

  const [companyData, setCompanyData] = useState({
    name: "",
    url: "",
  });

  const handleOnchange = (value, key) => {
    setCompanyData({ ...companyData, [key]: value });
  };

  const handleSubmit = async (bodyData) => {
    Keyboard.dismiss();
    setLoading(true)
    const data = {
      createBy: employerId,
      name: bodyData.name,
      url: bodyData.url,
      address: companyAddress,
    }
    try {
      await axios.post("https://9107-2402-800-61cf-8b27-b40e-9466-d1d1-fb91.ngrok-free.app/api/companies", {
        data: data
      });
      await updateRole({ userId: authState.user.id, role: roleData?.find(item => item.name === "EmployerCompany").id })
      setLoading(false)
      showToast("Create company success", COLORS.tertiary);
      router.push('/home');
    } catch (err) {
      showToast(err.response.data, "red");
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.container}>
            <Text style={styles.headerText}>Create Your Company</Text>
            <View style={styles.textInputContainer}>
              <View>
                <TextInput
                  style={[styles.textInput]}
                  placeholder="Enter company name"
                  value={companyData["name"]}
                  onChangeText={(value) => handleOnchange(value, "name")}
                />
                <Ionicons
                  style={styles.textInputIcon}
                  name="text-outline"
                  size={20}
                />
              </View>
              <View>
                <TextInput
                  style={styles.textInput}
                  placeholder="Enter company website"
                  value={companyData["url"]}
                  onChangeText={(value) => handleOnchange(value, "url")}
                />
                <Ionicons
                  style={styles.textInputIcon}
                  name="globe-outline"
                  size={20}
                />
              </View>
              <View>
                <TextInput
                  style={styles.textInput}
                  placeholder="Enter company address"
                  value={companyAddress}
                  onChangeText={(value) => setCompanyAddress(value)}
                />
                <Link style={styles.textInputIcon} href="/(modal)/map">
                  <Ionicons name="location-outline" size={20} />
                </Link>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => handleSubmit(companyData)}
              style={styles.buttonContainer}
            >
              {/* {renderIconStatus(authState.status)} */}
              <Text style={styles.buttonText}>Create</Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      {loading && <Loading />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.white,
    width: "90%",
    marginLeft: "5%",
    height: "100%",
  },
  headerText: {
    fontFamily: FONT.bold,
    fontSize: 30,
    marginBottom: 10,
    textAlign: "center",
    width: "100%",
  },
  uploadContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderColor: COLORS.gray2,
    borderWidth: 1,
    borderRadius: 3,
    marginBottom: 10,
  },
  uploadText: {
    fontFamily: FONT.regular,
    fontSize: 7,
    width: 80,
    textAlign: "center",
    opacity: 0.6,
  },
  logoCompany: {
    width: 60,
    height: 60,
  },
  textInputContainer: {
    width: "100%",
    position: "relative",
    height: 70,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    marginTop: 15,
  },
  textInput: {
    borderRadius: 20,
    width: "100%",
    backgroundColor: "#ECECEC",
    paddingLeft: 50,
    paddingVertical: 15,
    paddingRight: 20,
    fontFamily: FONT.medium,
    marginBottom: 10,
  },
  textInputIcon: {
    position: "absolute",
    left: 15,
    opacity: 0.2,
    top: 15,
    zIndex: 100,
  },
  companyLocation: {
    width: "100%",
  },
  textContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 5,
  },
  locationText: {
    fontFamily: FONT.medium,
    fontSize: 12,
    color: COLORS.tertiary,
  },
  buttonContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    flexDirection: "row",
    backgroundColor: COLORS.tertiary,
    borderRadius: 30,
    marginTop: 125,
  },
  buttonText: {
    color: "#fff",
    fontFamily: FONT.medium,
  },
});

export default CreateCompany;
