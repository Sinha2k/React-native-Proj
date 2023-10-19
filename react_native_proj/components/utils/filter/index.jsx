import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import BottomModal from "../modal";

import { COLORS, FONT } from "../../../constants";
import useFetchData from './api'

const data = ["Place", "Experiment", "Salary"];

const expData = ['Not required', 'Duoi 1 year', '1 year', '2 years', '3 years', '4 years', '5 years', 'Tren 5 years']

const salaryData = ['Duoi 10M', '10 - 15M', '15 - 20M', '20 - 25M', '25 - 30M', '30 - 50M', 'Tren 50M', 'Negotiable']

const Filter = () => {
  const [focus, setFocus] = useState(false);

  const [visible, setVisible] = useState(false);

  const {provinceData, err} = useFetchData()

  const [keyFilter, setKeyFilter] = useState('')

  const dataFilter = {
    'Place': provinceData,
    'Experiment': expData,
    'Salary': salaryData
  }


  return (
    <View style={styles.filterContainer}>
      <View style={styles.searchContainer}>
        <TextInput
          onFocus={() => setFocus(true)}
          style={[styles.searchInput, focus && {borderColor: COLORS.tertiary}]}
          placeholder="Name - Company - Place..."
          onChange={() => {}}
          value=""
        />
        <Ionicons
          style={styles.searchIcon}
          color={COLORS.gray2}
          name="search-outline"
          size={23}
        />
      </View>
      <View style={styles.filterContentContainer}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            borderRightWidth: 1,
            borderColor: "#ECECEC",
            paddingRight: 5,
            height: "100%",
            justifyContent: "space-between",
          }}
        >
          <Ionicons
            style={styles.filterIcon}
            name="filter-outline"
            color="black"
            size={20}
          />
          <Text style={{ fontFamily: FONT.medium, marginLeft: 5 }}>Filter</Text>
        </View>
        <View style={{ marginLeft: 7, marginRight: 80 }}>
          <FlatList
            data={data}
            horizontal
            contentContainerStyle={{ columnGap: 10 }}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => {setVisible(true), setKeyFilter(item)}}>
                <View style={styles.filterItem}>
                  <Text style={{ fontFamily: FONT.medium, marginRight: 5 }}>
                    {item}
                  </Text>
                  <Ionicons name="chevron-down-outline" size={20} />
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
      <BottomModal visible={visible} setVisible={setVisible} keyFilter={keyFilter} data={dataFilter} />
    </View>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 15,
    paddingVertical: 5,
    backgroundColor: "#fff",
  },
  searchContainer: {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#fff",
  },
  searchInput: {
    paddingLeft: 30,
    paddingVertical: 7,
    backgroundColor: "#F8F8F8",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#F8F8F8",
    color: "black",
    width: "100%",
  },
  searchIcon: {
    position: "absolute",
    left: 7,
    zIndex: 1000,
  },
  filterIcon: {},
  filterContentContainer: {
    alignItems: "center",
    width: "100%",
    paddingVertical: 5,
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "row",
    marginTop: 8,
    overflow: "hidden",
  },
  filterItem: {
    padding: 7,
    borderRadius: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ECECEC",
  },
});

export default Filter;
