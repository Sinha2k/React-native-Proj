import { View, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import styles from "./style";
import { COLORS, FONT, SIZES } from "../../../../constants";

const expValue = (exp) => {
  if (exp?.from > 0 && exp?.to > 0) return `${exp?.from} - ${exp?.to}`;
  else if (exp?.from > 0 && exp?.to === 0) return `Tren ${exp?.from}`;
  else if (exp?.from === 0 && exp?.to > 0) return `Duoi ${exp?.to}`;
  else return "No experiment required";
};

const Information = ({ job }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Information</Text>
      <View style={styles.info_item}>
        <View style={styles.item_icon}>
          <Ionicons color={COLORS.tertiary} name="hourglass" size={20} />
        </View>
        <View style={styles.item_content}>
          <Text
            style={{
              color: COLORS.gray,
              fontFamily: FONT.regular,
              fontSize: SIZES.small,
            }}
          >
            Experiment
          </Text>
          <Text style={{ fontFamily: FONT.bold, fontSize: 13 }}>{`${expValue(
            job?.experiment
          )}${
            expValue(job?.experiment) === "No experiment required"
              ? ""
              : " years"
          }`}</Text>
        </View>
      </View>
      <View style={styles.info_item}>
        <View style={styles.item_icon}>
          <Ionicons color={COLORS.tertiary} name="calendar" size={20} />
        </View>
        <View style={styles.item_content}>
          <Text
            style={{
              color: COLORS.gray,
              fontFamily: FONT.regular,
              fontSize: SIZES.small,
            }}
          >
            Type
          </Text>
          <Text style={{ fontFamily: FONT.bold, fontSize: 13 }}>
            {job?.type}
          </Text>
        </View>
      </View>
      <View style={styles.info_item}>
        <View style={styles.item_icon}>
          <Ionicons color={COLORS.tertiary} name="people" size={20} />
        </View>
        <View style={styles.item_content}>
          <Text
            style={{
              color: COLORS.gray,
              fontFamily: FONT.regular,
              fontSize: SIZES.small,
            }}
          >
            Number
          </Text>
          <Text style={{ fontFamily: FONT.bold, fontSize: 13 }}>
            {job?.number} person
          </Text>
        </View>
      </View>
      <View style={styles.info_item}>
        <View style={styles.item_icon}>
          <Ionicons color={COLORS.tertiary} name="person" size={20} />
        </View>
        <View style={styles.item_content}>
          <Text
            style={{
              color: COLORS.gray,
              fontFamily: FONT.regular,
              fontSize: SIZES.small,
            }}
          >
            Sex
          </Text>
          <Text style={{ fontFamily: FONT.bold, fontSize: 13 }}>{`${
            job?.sex === "" ? "Not required" : job?.sex
          }`}</Text>
        </View>
      </View>
      <View style={styles.info_item}>
        <View style={styles.item_icon}>
          <Ionicons color={COLORS.tertiary} name="cellular" size={20} />
        </View>
        <View style={styles.item_content}>
          <Text
            style={{
              color: COLORS.gray,
              fontFamily: FONT.regular,
              fontSize: SIZES.small,
            }}
          >
            Level
          </Text>
          <Text style={{ fontFamily: FONT.bold, fontSize: 13 }}>
            {job?.level}
          </Text>
        </View>
      </View>
    </View>
  );
};
export default Information;
