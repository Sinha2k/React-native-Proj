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

import styles from "./modal.style";
import { COLORS, FONT, SIZES } from "../../../constants";

const BottomModal = ({ keyFilter, data, visible, setVisible, setChooseFilter, chooseFilter, setDataFilter, placeData }) => {

  const [searchTerm, setSearchTerm] = useState('')

  const [searching, setSearching] = useState(false)

  const handleChooseFilter = (key, item) => {
    setVisible(false);
    setChooseFilter({...chooseFilter, [key]: item})
  }

  useEffect(() => {
    const delayToSearch= setTimeout(() => {
      setSearching(false)
      setDataFilter({...data, [keyFilter]: placeData?.filter((item) => item.includes(searchTerm)) })
    }, 3000)

    return () => clearTimeout(delayToSearch)
  }, [searchTerm])

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
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null}>
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
                onChangeText={(value) => {setSearchTerm(value), setSearching(true)}}
                value={searchTerm}
              />
              <Ionicons
                style={styles.searchIcon}
                color={COLORS.gray2}
                name="search-outline"
                size={23}
              />
              {searching && <ActivityIndicator style={{position: 'absolute', right: 5}} size={"small"} />}
            </View>
          )}
          <ScrollView
            style={styles.listContainer}
            showsVerticalScrollIndicator={false}
          >
            <TouchableOpacity onPress={() => handleChooseFilter(keyFilter, '')}>
              <View style={styles.listItems}>
                <Text style={styles.textItem}>All</Text>
              </View>
            </TouchableOpacity>
            <FlatList
              data={data[keyFilter]}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleChooseFilter(keyFilter, item)}>
                  <View style={styles.listItems}>
                    <Text style={styles.textItem}>{item}</Text>
                  </View>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item}
              showsVerticalScrollIndicator={false}
            />
          </ScrollView>
        </KeyboardAvoidingView>
        </View>
      </View>
    </Modal>
  );
};

export default BottomModal;
