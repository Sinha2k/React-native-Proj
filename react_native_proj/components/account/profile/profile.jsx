import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";

import BottomModal from "../../utils/modal";
import useFetchData from "../../utils/filter/api";
import { FONT, COLORS, SIZES } from "../../../constants";

const expData = [
  "Not required",
  "Duoi 1 year",
  "1 year",
  "2 years",
  "3 years",
  "4 years",
  "5 years",
  "Tren 5 years",
];

const desiredJobData = [
  "It - Software",
  "It Recruiter",
  "It Support Network",
  "It Admin",
  "Hr Recruiter",
  "Accounter",
  "Designer Graphic",
];

const Profile = ({ user }) => {
  const [visible, setVisible] = useState(false);

  const { provinceData, err } = useFetchData();

  const [keyFilter, setKeyFilter] = useState("");

  const [chooseFilter, setChooseFilter] = useState({
    placeJob: [],
    exp: "",
    desiredJob: ["It - Software"],
  });

  const [dataFilter, setDataFilter] = useState({
    placeJob: [],
    exp: expData,
    desiredJob: desiredJobData,
  });

  const clickEdit = (keyEdit) => {
    setVisible(true);
    setKeyFilter(keyEdit);
  };

  useEffect(() => {
    if (provinceData) {
      setDataFilter({ ...dataFilter, ["placeJob"]: provinceData });
    }
  }, [provinceData]);
  return (
    <View>
      <View style={styles.profileItem}>
        <View style={styles.profileTitle}>
          <Text style={{ fontFamily: FONT.bold }}>Experiment</Text>
          <TouchableOpacity onPress={() => clickEdit("exp")}>
            <Text style={{ fontFamily: FONT.bold, color: COLORS.tertiary }}>
              Edit
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.profileContent}>
          {/* <Text style={styles.profileContentText}>
            {user.exp === 0 ? "No experiment" : user.exp + "years"}
          </Text> */}
          {chooseFilter.exp ? (
            <Text style={styles.profileContentText}>{chooseFilter.exp}</Text>
          ) : (
            <Text
              style={{
                fontFamily: FONT.medium,
                color: "#F5A125",
                fontSize: SIZES.small,
              }}
            >
              Not updated yet
            </Text>
          )}
          <View></View>
        </View>
      </View>
      <View style={styles.profileItem}>
        <View style={styles.profileTitle}>
          <Text style={{ fontFamily: FONT.bold }}>Desired Job</Text>
          <TouchableOpacity onPress={() => clickEdit("desiredJob")}>
            <Text style={{ fontFamily: FONT.bold, color: COLORS.tertiary }}>
              Edit
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.profileContent}>
          {chooseFilter.desiredJob?.length > 0 ? (
            chooseFilter.desiredJob?.map((item, index) => (
              <Text key={index} style={styles.profileContentText}>
                {item}
              </Text>
            ))
          ) : (
            <Text
              style={{
                fontFamily: FONT.medium,
                color: "#F5A125",
                fontSize: SIZES.small,
              }}
            >
              Not updated yet
            </Text>
          )}
          <View></View>
        </View>
      </View>
      <View style={styles.profileItem}>
        <View style={styles.profileTitle}>
          <Text style={{ fontFamily: FONT.bold }}>Place</Text>
          <TouchableOpacity onPress={() => clickEdit("placeJob")}>
            <Text style={{ fontFamily: FONT.bold, color: COLORS.tertiary }}>
              Edit
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.profileContent}>
          {chooseFilter.placeJob?.length > 0 ? (
            chooseFilter.placeJob?.map((item, index) => (
              <Text key={index} style={styles.profileContentText}>
                {item}
              </Text>
            ))
          ) : (
            <Text
              style={{
                fontFamily: FONT.medium,
                color: "#F5A125",
                fontSize: SIZES.small,
              }}
            >
              Not updated yet
            </Text>
          )}
          <View></View>
        </View>
      </View>

      <BottomModal
        visible={visible}
        setVisible={setVisible}
        keyFilter={keyFilter}
        data={dataFilter}
        setChooseFilter={setChooseFilter}
        chooseFilter={chooseFilter}
        setDataFilter={setDataFilter}
        placeData={provinceData}
        desireData={desiredJobData}
      />
    </View>
  );
};

const styles = StyleSheet.create({
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
    flexWrap: "wrap",
    marginTop: 10,
    columnGap: 10,
    rowGap: 10,
    width: "100%",
  },
  profileContentText: {
    backgroundColor: COLORS.white,
    borderRadius: 4,
    padding: 5,
    fontFamily: FONT.medium,
    fontSize: SIZES.small,
  },
});

export default Profile;
