import { Stack, useNavigation } from "expo-router";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
import NearbyCard from "../../components/utils/card/nearby";
import { useState } from "react";
import { COLORS, SIZES } from "../../constants";

const tabs = [
  { id: 1, label: "7 days", value: 7 },
  { id: 2, label: "30 days", value: 30 },
  { id: 3, label: "All", value: 0 },
];

const Apply = () => {
  const navigation = useNavigation();

  const account = useSelector((state) => state.employee.account);

  const [activeTab, setActiveTab] = useState("7 days");

  function TabButton({ name, activeTab, onHandleClick }) {
    return (
      <TouchableOpacity
        style={styles.btn(name, activeTab)}
        onPress={onHandleClick}
      >
        <Text style={styles.btnText(name, activeTab)}>{name}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView>
      <Stack.Screen
        options={{
          headerShown: true,
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back-outline" size={25} />
            </TouchableOpacity>
          ),
          headerTitle: () => (
            <Text style={{ fontFamily: FONT.bold, fontSize: SIZES.large }}>
              Applied Job
            </Text>
          ),
        }}
      />
      <View style={{ display: "flex", flexDirection: "row" }}>
        {tabs.map((item, index) => (
          <TabButton
            key={index}
            name={item.label}
            activeTab={activeTab}
            onHandleClick={() => setActiveTab(item.label)}
          />
        ))}
      </View>
      <View>
        {account?.appliedJob?.data ? (
          account.appliedJob?.data?.map((item) => (
            <NearbyCard
              job={item.attributes.job.data.attributes}
              handleNavigate={() =>
                router.push(`/job-details/${item.attributes.job.data.id}`)
              }
            />
          ))
        ) : (
          <Text>You haven't applied any job yet</Text>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  btn: (name, activeTab) => ({
    paddingVertical: SIZES.small,
    paddingHorizontal: SIZES.large,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: name === activeTab ? COLORS.tertiary : "#ECECEC",
    marginBottom: name === activeTab ? 1 : 0,
  }),
  btnText: (name, activeTab) => ({
    fontFamily: "DMMedium",
    fontSize: SIZES.small,
    color: name === activeTab ? COLORS.tertiary : COLORS.gray,
  }),
});

export default Apply;
