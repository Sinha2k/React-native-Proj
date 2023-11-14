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
  import { useState, useEffect } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { Link, Stack, useNavigation, useSearchParams } from "expo-router";
  import axios from "axios";
  
  import { COLORS, FONT } from "../../constants";
  import Loading from "../../components/utils/loading/loading";
  import { showToast, useAuth } from "../context/AuthContext";
import { getEmployer } from "../../redux/reducer/employerSliceReducer";
  
  const UpdateCompany = () => {

    const params = useSearchParams()

    const navigation = useNavigation()

    const account = useSelector((state) => state.employer.account);
  
    const { companyAddress, setCompanyAddress } = useAuth();
  
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch()
  
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
        name: bodyData.name,
        url: bodyData.url,
        address: companyAddress,
      }
      try {
        await axios.put("https://72cb-27-69-6-204.ngrok-free.app/api/companies/" + params.id, {
          data: data
        });
        dispatch(getEmployer(account.profile?.data?.id))
        setLoading(false)
        showToast("Update company success", COLORS.tertiary);
      } catch (err) {
        showToast(err.response.data, "red");
      }
    };

    useEffect(() => {
        if (account) {
            setCompanyData({
                name: account.company?.data?.attributes?.name,
                url: account.company?.data?.attributes?.url
            })
            setCompanyAddress(account.company?.data?.attributes?.address)
        }
    }, [])
  
    return (
      <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
        <Stack.Screen 
            options={{
                headerShadowVisible: false,
                headerLeft: () => (
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="chevron-back" size={30} />
                    </TouchableOpacity>
                ),
                headerTitle: () => (
                    <Text style={{fontFamily: FONT.bold, fontSize: 15}}>{account.company?.data?.attributes?.name}</Text>
                )
            }}
        />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
              <Text style={styles.headerText}>Update Your Company</Text>
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
                <Text style={styles.buttonText}>Update</Text>
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
  
  export default UpdateCompany;
  