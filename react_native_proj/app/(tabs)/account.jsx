import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Animated,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { useActionSheet } from "@expo/react-native-action-sheet";
import * as ImagePicker from "expo-image-picker";
import { useDispatch, useSelector } from "react-redux";

import { COLORS, FONT, images, SHADOWS, SIZES } from "../../constants";
import user from "../../data/user";
import ApplyManagement from "../../components/account/applyManage";
import Settings from "../../components/account/setting";
import Profile from "../../components/account/profile/profile";
import {
  getEmployee,
  updateEmployee,
  uploadImage,
} from "../../redux/reducer/employeeSliceReducer";
import Loading from "../../components/utils/loading/loading";
import { useAuth } from "../context/AuthContext";
import {
  getEmployer,
  uploadImageCompany,
  uploadImageEmployer,
} from "../../redux/reducer/employerSliceReducer";

const Account = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(!isEnabled);

  const { authState } = useAuth();

  const roleAccount = authState.user?.role?.data?.attributes;

  const { account, status } = useSelector((state) =>
    roleAccount?.name === "Employee" ? state.employee : state.employer
  );

  const employeeId = useSelector((state) => state.employee.employeeId);

  const employerId = useSelector((state) => state.employer.employerId);

  const dispatch = useDispatch();

  const scrollY = new Animated.Value(0);

  const animateValue = (x, y) => {
    return scrollY.interpolate({
      inputRange: x,
      outputRange: y,
      extrapolate: "clamp",
    });
  };

  const chooseImage = async (useLibrary, option) => {
    let result;
    const options = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.75,
    };
    if (useLibrary) {
      await ImagePicker.requestMediaLibraryPermissionsAsync();

      result = await ImagePicker.launchImageLibraryAsync(options);
    } else {
      await ImagePicker.requestCameraPermissionsAsync();

      result = await ImagePicker.launchCameraAsync(options);
    }
    if (!result.canceled) {
      const formData = new FormData();
      formData.append("files", {
        uri: result.assets[0].uri,
        type: `image/${result.assets[0].uri.split(".")[1]}`,
        name: new Date() + "_avatar",
      });
      formData.append(
        "ref",
        option === "avatar"
          ? roleAccount?.name === "Employee"
            ? "api::employee.employee"
            : "api::employer.employer"
          : "api::company.company"
      );
      formData.append(
        "refId",
        option === "avatar"
          ? roleAccount?.name === "Employee"
            ? employeeId
            : employerId
          : account.company?.data?.id
      );
      formData.append("field", option === "avatar" ? "avatar" : "logo");
      await dispatch(
        option === "avatar"
          ? roleAccount?.name === "Employee"
            ? uploadImage(formData)
            : uploadImageEmployer(formData)
          : uploadImageCompany(formData)
      );
      dispatch(
        roleAccount?.name === "Employee"
          ? getEmployee(account.profile?.data?.id)
          : getEmployer(account.profile?.data?.id)
      );
    }
  };

  const { showActionSheetWithOptions } = useActionSheet();

  const openBottomSheet = (upload) => {
    const options = ["Camera", "Album", "Delete", "Cancel"];
    const destructiveButtonIndex = 2;
    const cancelButtonIndex = 3;
    const title = upload === "logo" ? "Update logo" : "Update avatar";

    showActionSheetWithOptions(
      {
        options,
        title,
        cancelButtonIndex,
        destructiveButtonIndex,
      },
      (selectedIndex) => {
        switch (selectedIndex) {
          case 0:
            chooseImage(false, upload);
            break;
          case 1:
            chooseImage(true, upload);
            break;

          case destructiveButtonIndex:
            // Delete
            break;

          case cancelButtonIndex:
          // Canceled
        }
      }
    );
  };

  return (
    <SafeAreaView
      style={{ backgroundColor: "#fff", flex: 1, position: "relative" }}
    >
      <View style={[styles.profileContainer]}>
        <Animated.Image
          style={{
            width: "100%",
            height: 140,
            transform: [{ translateY: animateValue([0, 140], [0, -140]) }],
          }}
          source={images.bg}
          resizeMode="cover"
        />
        <Animated.View
          style={{
            width: "100%",
            paddingHorizontal: 15,
            marginTop: -60,
            transform: [{ translateY: animateValue([0, 140], [0, -90]) }],
          }}
        >
          <Animated.View
            style={[
              styles.headerProfile,
              { transform: [{ scale: animateValue([0, 140], [1, 1.08]) }] },
            ]}
          >
            <Animated.View
              style={[
                styles.avatarProfile,
                {
                  transform: [
                    { translateX: animateValue([0, 140], [0, -20]) },
                    { translateY: animateValue([0, 140], [0, 20]) },
                  ],
                },
              ]}
            >
              <Animated.View
                style={[
                  styles.imageProfile,
                  {
                    transform: [{ scale: animateValue([0, 140], [1, 0.6]) }],
                    borderColor: animateValue(
                      [-10, 0, 140],
                      ["blue", "blue", 0]
                    ),
                  },
                ]}
              >
                <Image
                  style={{ width: 60, height: 60, borderRadius: 100 }}
                  source={{
                    uri:
                      account?.avatar?.data !== null
                        ? account?.avatar?.data?.attributes.url
                        : "https://res.cloudinary.com/dwapyi65c/image/upload/v1698951441/profile_60c5a0cd5b.png",
                  }}
                  resizeMode="cover"
                />
              </Animated.View>
              <Animated.View
                style={{ opacity: animateValue([0, 100], [1, 0]) }}
              >
                <TouchableOpacity
                  style={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    backgroundColor: "#fff",
                    borderRadius: 100,
                    padding: 2,
                  }}
                  onPress={() => openBottomSheet("avatar")}
                >
                  <Ionicons name="camera" size={20} />
                </TouchableOpacity>
              </Animated.View>
            </Animated.View>
            <View style={styles.contentHeader}>
              <Animated.Text
                style={{
                  fontFamily: FONT.bold,
                  fontSize: SIZES.medium,
                  marginBottom: 10,
                  width: "100%",
                  transform: [
                    { translateX: animateValue([0, 140], [0, -40]) },
                    { translateY: animateValue([0, 140], [0, 35]) },
                  ],
                }}
              >
                {account?.profile?.data?.attributes?.username}
              </Animated.Text>
              <Animated.Text
                style={{
                  fontFamily: FONT.medium,
                  fontSize: SIZES.small,
                  width: "100%",
                  opacity: animateValue([0, 100], [1, 0]),
                }}
              >
                Code: {account?.profile?.data?.attributes?.code}
              </Animated.Text>
            </View>
          </Animated.View>
        </Animated.View>
      </View>

      <Animated.ScrollView
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        style={{
          width: "90%",
          marginLeft: "5%",
          marginBottom: 5,
        }}
      >
        <View style={{ marginTop: 155 }}></View>

        <Profile
          openBottomSheet={() => openBottomSheet("logo")}
          role={roleAccount?.name}
        />

        {roleAccount?.name === "Employee" && (
          <>
            <Text style={{ fontFamily: FONT.bold, paddingTop: 15 }}>
              CV Management
            </Text>
            <View
              style={[
                styles.profileItem,
                {
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                },
              ]}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Ionicons name="cellular" size={20} color={COLORS.tertiary} />
                <Text style={{ marginLeft: 20, fontFamily: FONT.regular }}>
                  Status apply job
                </Text>
              </View>
              <Switch
                trackColor={{ false: "#ECECEC", true: COLORS.tertiary }}
                thumbColor={isEnabled ? "#fff" : "#fff"}
                ios_backgroundColor="#ECECEC"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            </View>
            <View
              style={[
                styles.profileItem,
                {
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                },
              ]}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Ionicons name="person" size={20} color={COLORS.tertiary} />
                <Text style={{ marginLeft: 20, fontFamily: FONT.regular }}>
                  Allow to contact
                </Text>
              </View>
              <Switch
                trackColor={{ false: "#ECECEC", true: COLORS.tertiary }}
                thumbColor={isEnabled ? "#fff" : "#fff"}
                ios_backgroundColor="#ECECEC"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            </View>
          </>
        )}

        <Text style={{ fontFamily: FONT.bold, paddingTop: 15 }}>
          Apply Job Management
        </Text>
        <ApplyManagement user={account} />

        <Text style={{ fontFamily: FONT.bold, paddingTop: 15 }}>
          Account Settings
        </Text>
        <Settings />
      </Animated.ScrollView>

      {status === "loading" && <Loading />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 1000,
  },
  headerProfile: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // width: "90%",
    borderRadius: 10,
    ...SHADOWS.small,
    paddingHorizontal: 10,
    paddingVertical: 20,
    position: "relative",
    // marginTop: -60,
    backgroundColor: "#fff",
    // textAlign: 'left'
  },
  avatarProfile: {
    position: "relative",
    marginLeft: 10,
  },
  imageProfile: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    padding: 5,
    borderWidth: 1,
  },
  contentHeader: {
    display: "flex",
    justifyContent: "space-between",
    width: "68%",
    marginLeft: 10,
  },
  profileItem: {
    width: "100%",
    paddingVertical: 15,
    borderBottomColor: "#ECECEC",
    borderBottomWidth: 1,
  },
  profileTitle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    fontFamily: FONT.medium,
  },
  profileContent: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  profileContentText: {
    backgroundColor: COLORS.white,
    borderRadius: 4,
    padding: 5,
    fontFamily: FONT.medium,
    fontSize: SIZES.small,
  },
});

export default Account;
