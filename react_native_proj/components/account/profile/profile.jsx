import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { useSelector } from "react-redux";

import BottomModal from "../../utils/modal";
import useFetchData from "../../utils/filter/api";
import { FONT, COLORS, SIZES } from "../../../constants";

const expData = [
  { value: 0, desc: "No experiment" },
  { value: 1, desc: "1 year" },
  { value: 2, desc: "2 years" },
  { value: 3, desc: "3 years" },
  { value: 4, desc: "4 years" },
  { value: 5, desc: "5 years" },
  { value: 6, desc: "Tren 5 years" },
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

  const account = useSelector(state => state.employee.account)

  const [chooseFilter, setChooseFilter] = useState({
    placeJob: account.placeJob,
    exp: account.exp,
    desiredJob: account.desiredJob,
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
          <Text style={styles.profileContentText}>
            {expData.find((item) => item.value == chooseFilter.exp)?.desc}
          </Text>
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
