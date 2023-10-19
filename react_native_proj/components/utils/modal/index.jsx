import React, { useState } from "react";
import {
  View,
  TextInput,
  Modal,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import styles from "./modal.style";
import { COLORS, FONT, SIZES } from "../../../constants";

const BottomModal = ({ keyFilter, data, visible, setVisible }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      style={{ backgroundColor: "#919090" }}
      visible={visible}
      onRequestClose={() => setVisible(!visible)}
    >
      <View style={styles.modalLayout}>
        <TouchableWithoutFeedback onPress={() => setVisible(false)}>
          <View style={styles.modalMask}></View>
        </TouchableWithoutFeedback>
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
              onPress={() => setVisible(false)}
            >
              <Ionicons
                style={{ marginLeft: 2, opacity: 0.6 }}
                name="close-sharp"
                size={20}
              />
            </TouchableOpacity>
          </View>
          {keyFilter === "Place" && (
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.searchInput}
                placeholder="Type search key..."
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
          )}
          <ScrollView
            style={styles.listContainer}
            showsVerticalScrollIndicator={false}
          >
            <TouchableOpacity>
              <View style={styles.listItems}>
                <Text style={styles.textItem}>All</Text>
              </View>
            </TouchableOpacity>
            <FlatList
              data={data[keyFilter]}
              renderItem={({ item }) => (
                <TouchableOpacity>
                  <View style={styles.listItems}>
                    <Text style={styles.textItem}>{item}</Text>
                  </View>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item}
              showsVerticalScrollIndicator={false}
            />
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default BottomModal;
