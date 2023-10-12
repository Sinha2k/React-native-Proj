import { View, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import styles from "../information/style";
import { COLORS, FONT, SIZES } from "../../../../constants";

const Company = ({ job }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{job?.company?.name}</Text>
      <View style={styles.info_item}>
        <View style={styles.item_icon}>
          <Ionicons name="business" color={COLORS.tertiary} size={20} />
        </View>
        <View style={styles.item_content}>
          <Text
            style={{
              color: COLORS.gray,
              fontFamily: FONT.regular,
              fontSize: SIZES.small,
            }}
          >
            Address
          </Text>
          <Text style={{ fontFamily: FONT.bold, fontSize: 13 }}>
            {job?.company?.address}
          </Text>
        </View>
      </View>
      <View style={styles.info_item}>
        <View style={styles.item_icon}>
          <Ionicons name="earth" color={COLORS.tertiary} size={20} />
        </View>
        <View style={styles.item_content}>
          <Text
            style={{
              color: COLORS.gray,
              fontFamily: FONT.regular,
              fontSize: SIZES.small,
            }}
          >
            Website
          </Text>
          <Text style={{ fontFamily: FONT.bold, fontSize: 13 }}>
            {job?.company?.url}
          </Text>
        </View>
      </View>
    </View>
  );
};
export default Company;
