import {
  View,
  Text,
  SafeAreaView,
  Button,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
  Platform,
  Alert,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
// import messaging from '@react-native-firebase/messaging';

import { COLORS, FONT, images } from "../constants";
import { useAuth } from "./context/AuthContext";

const data = [
  {
    id: 0,
    image: images.job_offer,
    title: "Job Offer",
    description: "Brings you many attractive jobs to choose and apply",
  },
  {
    id: 1,
    image: images.it_job,
    title: "It Job",
    description:
      "Is a great choice for developer with hundreds of IT jobs a day",
  },
  {
    id: 2,
    image: images.recommendation,
    title: "Recommendation",
    description:
      "A letter of recommendation for employer and company in the future",
  },
];

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const Presentation = () => {
  const router = useRouter();

  const _carousel = useRef();

  const notificationListener = useRef();
  const responseListener = useRef();

  const [activeDotIndex, setActiveDotIndex] = useState(0);

  const [devicePushToken, setDevicePushToken] = useState("");

  const { authState } = useAuth();

  const _renderItem = ({ item, index }) => {
    return (
      <View>
        <Image
          source={item.image}
          style={{
            height: Dimensions.get("window").width,
            width: Dimensions.get("window").width,
          }}
        />
        <View style={{ padding: 15 }}>
          <Text style={{ fontSize: 18, fontFamily: FONT.bold }}>
            {item.title}
          </Text>
          <Text
            style={{
              marginTop: 20,
              fontSize: 16,
              fontFamily: FONT.medium,
            }}
          >
            {item.description}
          </Text>
        </View>
      </View>
    );
  };

  async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = await Notifications.getExpoPushTokenAsync({
        projectId: Constants.expoConfig.extra.eas.projectId,
      });
    } else {
      alert("Must use physical device for Push Notifications");
    }

    return token.data;
  }

  // const sendNotification = async (token) => {
  //   try {
  //     await fetch('https://fcm.googleapis.com/fcm/send', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `key=AAAAcI2Ryuo:APA91bGjadj72WXMvfIIgHysFa0l3P3Q00XEtSCGc3GiATX5P-Pe3ZikAkV5s2OXQ-mQHux-hV9nhQ0z54mlkSsyeLZlbd6mVx9Ii7dbOK8Amesv600vd0i8H3xRmjmlumld34fuD9_Y`,
  //       },
  //       body: JSON.stringify({
  //         to: token,
  //         priority: 'normal',
  //         data: {
  //           experienceId: '@sinha2k/react_native_proj',
  //           scopeKey: '@sinha2k/react_native_proj',
  //           title: "📧 You've got mail",
  //           message: 'Hello world! 🌐',
  //         },
  //       }),
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  async function sendPushNotification(expoPushToken) {
    const message = {
      to: expoPushToken,
      sound: "default",
      title: "Notification",
      body: "You have a new notification",
      data: { someData: "goes here" },
    };

    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });
  }

  const navigate = () => {
    authState.authenticated
    ? authState.user?.role?.data.id > 1
      ? authState.user?.role?.data.attributes.name === "Employer" 
      ? router.push("/createCompany")
      : router.push("/home")
      : router.push("/role_permission")
    : router.push("/login");
  }

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setDevicePushToken(token)
    );

    // notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
    //   setNotification(notification);
    // });

    // responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
    //   console.log(response);
    // });

    // return () => {
    //   Notifications.removeNotificationSubscription(notificationListener.current);
    //   Notifications.removeNotificationSubscription(responseListener.current);
    // };
  }, []);

  // const requestUserPermission = async () => {
  //   const authStatus = await messaging().requestPermission();
  //   const enabled =
  //     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
  //     authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  //   if (enabled) {
  //     console.log('Authorization status:', authStatus);
  //   }
  // }

  // useEffect(() => {
  //   if(requestUserPermission()) {
  //     messaging().getToken().then(token => console.log(token))
  //   } else {
  //     console.log(authStatus);
  //   }
  //   messaging()
  //     .getInitialNotification()
  //     .then(async remoteMessage => {
  //       if (remoteMessage) {
  //         console.log(
  //           'Notification caused app to open from quit state:',
  //           remoteMessage.notification,
  //         );
  //       }
  //     });
  //   messaging().onNotificationOpenedApp(async remoteMessage => {
  //     console.log(
  //       'Notification caused app to open from background state:',
  //       remoteMessage.notification,
  //     );
  //   });
  //   messaging().setBackgroundMessageHandler(async remoteMessage => {
  //     console.log('Message handled in the background!', remoteMessage);
  //   });
  //   const unsubscribe = messaging().onMessage(async remoteMessage => {
  //     Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
  //   });

  //   return unsubscribe;
  // })

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View
        style={{
          width: "98%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
      >
        <Button
          color={COLORS.tertiary}
          title="Skip"
          onPress={() => navigate()}
        />
      </View>
      <Carousel
        ref={_carousel}
        data={data}
        renderItem={_renderItem}
        sliderWidth={Dimensions.get("window").width}
        itemWidth={Dimensions.get("window").width}
        onSnapToItem={(index) => setActiveDotIndex(index)}
      />
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Pagination
          carouselRef={_carousel}
          activeDotIndex={activeDotIndex}
          dotsLength={3}
          dotStyle={{
            width: 15,
            backgroundColor: COLORS.tertiary,
          }}
          inactiveDotStyle={{
            width: 10,
            height: 10,
            backgroundColor: "gray",
          }}
        />
        <View style={{ padding: 15, flexDirection: "row" }}>
          <TouchableWithoutFeedback
            onPress={() => {
              _carousel.current.snapToItem(activeDotIndex - 1);
            }}
          >
            <View
              style={{
                height: 50,
                width: 50,
                borderRadius: 25,
                backgroundColor: COLORS.gray2,
                marginEnd: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Ionicons name="chevron-back-outline" size={30} color="#fff" />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => {
              _carousel.current.snapToItem(activeDotIndex + 1);
              if (activeDotIndex === data.length - 1) {
                navigate()
              }
            }}
          >
            <View
              style={{
                height: 50,
                width: 50,
                borderRadius: 25,
                backgroundColor: COLORS.tertiary,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Ionicons name="chevron-forward-outline" size={30} color="#fff" />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>

      {/* <Button
        title="Send notification"
        onPress={() => sendPushNotification(devicePushToken)}
      /> */}
    </SafeAreaView>
  );
};

export default Presentation;
