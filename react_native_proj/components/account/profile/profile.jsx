import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
} from "react-native";
import { useSelector } from "react-redux";
import { router } from "expo-router";

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

const Profile = ({ role, openBottomSheet }) => {
  const [visible, setVisible] = useState(false);

  const { provinceData, err } = useFetchData();

  const [keyFilter, setKeyFilter] = useState("");

  const { account, status } = useSelector((state) =>
    role === "Employee" ? state.employee : state.employer
  );

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
    <View style={{ alignItems: "center" }}>
      {role === "EmployerCompany" && (
        <TouchableOpacity
          onPress={openBottomSheet}
          style={styles.uploadContainer}
        >
          <Image
            style={styles.logoCompany}
            resizeMode="cover"
            source={{
              uri: account.company?.data?.attributes?.logo?.data
                ? account.company?.data?.attributes?.logo?.data?.attributes?.url
                : "https://icons.veryicon.com/png/o/miscellaneous/zr_icon/company-23.png",
            }}
          />
          <Text style={styles.uploadText}>Press to upload company logo</Text>
        </TouchableOpacity>
      )}
      {role === "EmployerCompany" && (
        <TouchableOpacity
          style={{
            width: "100%",
            justifyContent: "flex-end",
            display: "flex",
            flexDirection: "row",
            marginBottom: -5
          }}
          onPress={() => router.push(`/update-company/${account.company?.data?.id}`)}
        >
          <Text style={{ fontFamily: FONT.bold, color: COLORS.tertiary }}>
            Update company
          </Text>
        </TouchableOpacity>
      )}
      <View style={styles.profileItem}>
        <View style={styles.profileTitle}>
          <Text style={{ fontFamily: FONT.bold }}>
            {role === "EmployerCompany" ? "Company name" : "Experiment"}
          </Text>
          {role === "Employee" && (
            <TouchableOpacity onPress={() => clickEdit("exp")}>
              <Text style={{ fontFamily: FONT.bold, color: COLORS.tertiary }}>
                Edit
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.profileContent}>
          {/* <Text style={styles.profileContentText}>
            {user.exp === 0 ? "No experiment" : user.exp + "years"}
          </Text> */}
          <Text style={styles.profileContentText}>
            {role === "EmployerCompany"
              ? account.company?.data?.attributes?.name
              : expData.find((item) => item.value == chooseFilter.exp)?.desc}
          </Text>
          <View></View>
        </View>
      </View>
      <View style={styles.profileItem}>
        <View style={styles.profileTitle}>
          <Text style={{ fontFamily: FONT.bold }}>
            {role === "EmployerCompany" ? "Company website" : "Desired Job"}
          </Text>
          {role === "Employee" && (
            <TouchableOpacity onPress={() => clickEdit("desiredJob")}>
              <Text style={{ fontFamily: FONT.bold, color: COLORS.tertiary }}>
                Edit
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.profileContent}>
          {role === "EmployerCompany" ? (
            <Text style={styles.profileContentText}>
              {account.company?.data?.attributes?.url}
            </Text>
          ) : chooseFilter.desiredJob?.length > 0 ? (
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
          <Text style={{ fontFamily: FONT.bold }}>
            {role === "EmployerCompany" ? "Company address" : "Place"}
          </Text>
          {role === "Employee" && (
            <TouchableOpacity onPress={() => clickEdit("placeJob")}>
              <Text style={{ fontFamily: FONT.bold, color: COLORS.tertiary }}>
                Edit
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.profileContent}>
          {role === "EmployerCompany" ? (
            <Text style={styles.profileContentText}>
              {account.company?.data?.attributes?.address}
            </Text>
          ) : chooseFilter.placeJob?.length > 0 ? (
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
    width: "30%",
    marginTop: 10,
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
