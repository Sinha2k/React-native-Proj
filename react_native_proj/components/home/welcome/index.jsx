import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  Animated,
} from "react-native";

import styles from "./style";
import { SIZES, icons } from "../../../constants";
import { useState } from "react";

const jobTypes = ["Fulltime", "Parttime", "Contractor"];

const Welcome = ({ opacity }) => {
  const [activeJobType, setActiveJobType] = useState("Fulltime");

  const [searchKey, setSearchKey] = useState("")

  return (
    <View style={{ flex: 1, padding: SIZES.medium, position: 'relative'}}>
      <View style={styles.container}>
        <Animated.Text style={[styles.welcomeMessage, {opacity: opacity}]}>Find your perfect job</Animated.Text>
      </View>

        <View
          style={[
            styles.searchContainer,
          ]}
        >
          <View style={styles.searchWrapper}>
            <TextInput
              placeholder="What are you looking for ?"
              value={searchKey}
              onChangeText={(value) => setSearchKey(value)}
              style={styles.searchInput}
            />
          </View>
          <TouchableOpacity style={styles.searchBtn}>
            <Image
              source={icons.search}
              resizeMode="contain"
              style={styles.searchBtnImage}
            />
          </TouchableOpacity>
        </View>

      <View style={styles.tabsContainer}>
        <FlatList
          data={jobTypes}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() => setActiveJobType(item)}
                style={styles.tab(activeJobType, item)}
              >
                <Text style={styles.tabText(activeJobType, item)}>{item}</Text>
              </TouchableOpacity>
            );
          }}
          horizontal
          keyExtractor={(item) => item}
          contentContainerStyle={{ columnGap: SIZES.small }}
        />
      </View>
    </View>
  );
};

export default Welcome;
