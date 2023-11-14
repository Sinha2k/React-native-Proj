import { Stack, useNavigation } from "expo-router";
import {
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import { useState, useEffect } from "react";

import { FONT } from "../../constants";
import { showToast, useAuth } from "../context/AuthContext";

const MapLocation = () => {
  const navigation = useNavigation();

  const {companyAddress, setCompanyAddress} = useAuth()

  const [currentLocation, setCurrentLocation] = useState({
    latitude: 21.008527330399808,
    longitude: 105.93678908337147,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [location, setLocation] = useState({
    latitude: 21.008527330399808,
    longitude: 105.93678908337147,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const userLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      showToast("Permission to access location was denied", "red");
      return;
    }

    let location = await Location.getCurrentPositionAsync({
      enableHighAccuracy: true,
    });
    setCurrentLocation({
      ...currentLocation,
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
  };

  const pinLocation = async (coors) => {
    setLocation({
      ...location,
      latitude: coors.latitude,
      longitude: coors.longitude,
    });
    const newLocation = await Location.reverseGeocodeAsync(coors);
    const newAddress = `${newLocation[0].name}, ${newLocation[0].district}, ${newLocation[0].region}`
    setCompanyAddress(newAddress)
  };

  useEffect(() => {
    userLocation();
  }, []);

  return (
    <SafeAreaView>
      <Stack.Screen
        options={{
          headerShadowVisible: false,
          headerShown: true,
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack({})}>
              <Ionicons name="close-outline" size={25} />
            </TouchableOpacity>
          ),
          headerTitle: () => (
            <Text style={{ fontFamily: FONT.bold }}>Search loaction</Text>
          ),
        }}
      />
      <MapView
        onPress={(event) => pinLocation(event.nativeEvent.coordinate)}
        region={currentLocation}
        style={styles.map}
      >
        <Marker
          description=""
          title="Current location"
          coordinate={currentLocation}
        />
        <Marker description="" title={companyAddress} coordinate={location} />
      </MapView>
      <Text>MapView</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
});

export default MapLocation;
