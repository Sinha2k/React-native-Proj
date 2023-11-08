import {
  View,
  Text,
  SafeAreaView,
  Animated,
  RefreshControl,
  Image,
} from "react-native";
import { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { COLORS, FONT, SIZES } from "../../constants";
import Welcome from "../../components/home/welcome";
import PopularJob from "../../components/home/PopularJob";
import NearbyJob from "../../components/home/NearbyJob";
import { getAllJobs } from "../../redux/reducer/jobSliceReducer";
import { getEmployee } from "../../redux/reducer/employeeSliceReducer";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const scrollY = new Animated.Value(0);
  const translateY = scrollY.interpolate({
    inputRange: [-200, 0, 270, 300],
    outputRange: [200, 0, -270, -125],
    extrapolate: "clamp",
  });
  const opacity = scrollY.interpolate({
    inputRange: [0, 230],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });
  const shadowOpacity = scrollY.interpolate({
    inputRange: [-200, 0, 270, 300],
    outputRange: [0, 0, 0, 0.1],
    extrapolate: "clamp",
  });

  const [refreshing, setRefreshing] = useState(false);

  const dispatch = useDispatch();

  const status = useSelector((state) => state.jobs.status);

  const account = useSelector((state) => state.employee.account);

  const {authState} = useAuth()

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      dispatch(getAllJobs());
      setRefreshing(status === "loading");
    }, 2000);
  }, []);

  useEffect(() => {
    dispatch(getAllJobs());
    dispatch(getEmployee(authState.user.id))
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.lightWhite,
        position: "relative",
      }}
    >
      <Animated.View
        style={[
          {
            position: "absolute",
            width: "100%",
            transform: [{ translateY: translateY }],
            backgroundColor: COLORS.lightWhite,
            zIndex: 1000,
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 3.4,
            elevation: 1,
            shadowColor: "#111",
            shadowOpacity: shadowOpacity,
          },
        ]}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            paddingLeft: SIZES.medium,
            paddingTop: SIZES.small,
            height: 60,
            marginTop: 40,
          }}
        >
          {/* <ScreenHeaderBtn iconUrl={images.profile} dimension="100%" /> */}
          <Image
            source={{
              uri: account?.avatar?.data !== null
                ? account?.avatar?.data?.attributes.url
                : "https://res.cloudinary.com/dwapyi65c/image/upload/v1698951441/profile_60c5a0cd5b.png",
            }}
            resizeMode="cover"
            style={{width: 50, height: 50, borderRadius: 20}}
          />
          <View style={{ marginLeft: 20 }}>
            <Text style={{ fontFamily: FONT.medium, fontSize: SIZES.medium }}>
              Hello {account?.profile?.data?.attributes?.username}
            </Text>
            <Text
              style={{
                fontFamily: FONT.regular,
                fontSize: SIZES.small,
                color: COLORS.gray,
              }}
            >
              Have a good day !!!
            </Text>
          </View>
        </View>

        <Welcome opacity={opacity} />
      </Animated.View>
      <Animated.ScrollView
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={{ marginTop: 250 }} />
        <PopularJob />
        <NearbyJob />
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

export default Home;
