import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Modal,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Checkbox from "expo-checkbox";
import { useDispatch, useSelector } from "react-redux";

import styles from "./modal.style";
import { COLORS, FONT, SIZES } from "../../../constants";
import { updateEmployee } from "../../../redux/reducer/employeeSliceReducer";

const BottomModal = ({
  keyFilter,
  data,
  visible,
  setVisible,
  setChooseFilter,
  chooseFilter,
  setDataFilter,
  placeData,
  desireData,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const [searching, setSearching] = useState(false);

  const dispatch = useDispatch();

  const employeeId = useSelector((state) => state.employee.employeeId);

  const handleChooseFilter = (key, item) => {
    if (key !== "placeJob" && key !== "desiredJob") {
      setVisible(false);
      if (key === "exp") {
        setChooseFilter({ ...chooseFilter, [key]: item.value });
        dispatch(
          updateEmployee({
            employeeId: employeeId,
            bodyData: {
              placeJob: chooseFilter["placeJob"],
              desiredJob: chooseFilter["desiredJob"],
              exp: item.value,
            },
          })
        );
      } else {
        setChooseFilter({ ...chooseFilter, [key]: item });
      }
    }
  };

  const handleCheckbox = (value, item) => {
    if (value) {
      const array = Array.from(chooseFilter[keyFilter]);
      array.push(item);
      console.log(array);
      setChooseFilter({ ...chooseFilter, [keyFilter]: array });
    } else {
      const convertArray = Array.from(chooseFilter[keyFilter]);
      const array = convertArray?.filter((i) => i !== item);
      console.log(array);
      setChooseFilter({ ...chooseFilter, [keyFilter]: array });
    }
  };

  const handleCloseModal = (key) => {
    setVisible(false);
    if (key === "placeJob" || key === "desiredJob") {
      dispatch(
        updateEmployee({
          employeeId: employeeId,
          bodyData: chooseFilter,
        })
      );
    }
  };

  useEffect(() => {
    if (placeData) {
      const delayToSearch = setTimeout(() => {
        setSearching(false);
        setDataFilter({
          ...data,
          [keyFilter]:
            keyFilter === "desiredJob"
              ? desireData?.filter((item) => item.includes(searchTerm))
              : placeData?.filter((item) => item.includes(searchTerm)),
        });
      }, 3000);

      return () => clearTimeout(delayToSearch);
    }
  }, [searchTerm]);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      style={{ backgroundColor: "#919090" }}
      visible={visible}
      onRequestClose={() => setVisible(!visible)}
    >
      <View style={styles.modalLayout}>
        <TouchableWithoutFeedback
          onPress={() => {
            if(!["placeJob", "desiredJob"].includes(keyFilter)) {
              setVisible(false)
            };
          }}
        >
          <View style={styles.modalMask}></View>
        </TouchableWithoutFeedback>

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "position" : null}
          style={{
            backgroundColor: "red",
            position: "absolute",
            width: "100%",
            bottom: 0,
          }}
          enabled={
            data["Place"]?.length <= 4 ||
            data["placeJob"]?.length <= 4 ||
            data["desiredJob"]?.length <= 5
          }
        >
          <View style={styles.modalContainer}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={{ fontFamily: FONT.bold, fontSize: SIZES.medium }}>
                Select {keyFilter}
              </Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => handleCloseModal(keyFilter)}
              >
                <Ionicons
                  style={{ marginLeft: 2, opacity: 0.6 }}
                  name="close-sharp"
                  size={20}
                />
              </TouchableOpacity>
            </View>
            {(keyFilter === "Place" ||
              keyFilter === "placeJob" ||
              keyFilter === "desiredJob") && (
              <View style={styles.searchContainer}>
                <TextInput
                  style={styles.searchInput}
                  placeholder="Type search key..."
                  onChangeText={(value) => {
                    setSearchTerm(value), setSearching(true);
                  }}
                  value={searchTerm}
                />
                <Ionicons
                  style={styles.searchIcon}
                  color={COLORS.gray2}
                  name="search-outline"
                  size={23}
                />
                {searching && (
                  <ActivityIndicator
                    style={{ position: "absolute", right: 5 }}
                    size={"small"}
                  />
                )}
              </View>
            )}
            <ScrollView
              style={styles.listContainer}
              showsVerticalScrollIndicator={false}
            >
              <TouchableOpacity
                onPress={() => {
                  handleChooseFilter(keyFilter, ""),
                    keyFilter === "Place" && setSearchTerm("");
                }}
              >
                <View style={styles.listItems}>
                  <Text style={styles.textItem}>All</Text>
                </View>
              </TouchableOpacity>
              <FlatList
                data={data[keyFilter]}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => handleChooseFilter(keyFilter, item)}
                  >
                    <View style={styles.listItems}>
                      <Text style={styles.textItem}>
                        {keyFilter === "exp" ? item.desc : item}
                      </Text>
                      {keyFilter === "placeJob" ||
                      keyFilter === "desiredJob" ? (
                        <Checkbox
                          color={
                            chooseFilter[keyFilter]?.includes(item)
                              ? COLORS.tertiary
                              : undefined
                          }
                          value={chooseFilter[keyFilter]?.includes(item)}
                          onValueChange={(value) => handleCheckbox(value, item)}
                        />
                      ) : (
                        ""
                      )}
                    </View>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) =>
                  keyFilter === "exp" ? item.value : item
                }
                showsVerticalScrollIndicator={false}
              />
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};

export default BottomModal;
