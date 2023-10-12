import { View, Text, Image } from "react-native";
import FontAwsome from "@expo/vector-icons/FontAwesome";

import { COLORS, FONT, SIZES, images } from "../../../constants";
import styles from "./header.style";

const salaryValue = (salary) => {
  if (salary?.from > 0 && salary?.to > 0)
    return `${salary?.from} - ${salary?.to}`;
  else if (salary?.from > 0 && salary?.to === 0) return `Tren ${salary?.from}`;
  else if (salary?.from === 0 && salary?.to > 0) return `Duoi ${salary?.to}`;
  else return "Negotiable";
};

const HeaderJobDetail = ({ job }) => {
  return (
    <View style={styles.headerContainer}>
      <Image style={styles.headerImage} source={images.bg} resizeMode="cover" />
      {job ? (
        <View style={styles.headerContent}>
          <View style={styles.companyContent}>
            <Image
              width={60}
              height={60}
              resizeMode="contain"
              source={{ uri: job.logo }}
            />
          </View>
          <Text style={styles.title}>{job.title}</Text>
          <Text style={styles.company}>{job.company?.name}</Text>
          <View style={styles.sala_loca_container}>
            <View style={styles.sala}>
              <FontAwsome name="dollar" color={COLORS.tertiary} size={20} />
              <Text style={{fontSize: SIZES.xSmall, color: COLORS.gray, fontFamily: FONT.regular, marginTop: 10}}>Salary</Text>
              <Text style={styles.salaText}>{`${salaryValue(job?.salary)}${
                salaryValue(job?.salary) === "Negotiable" ? "" : " M"
              }`}</Text>
            </View>
            <View style={styles.loca}>
              <FontAwsome name="map-marker" color={COLORS.tertiary} size={20} />
              <Text style={{fontSize: SIZES.xSmall, color: COLORS.gray, fontFamily: FONT.regular, marginTop: 10}}>Location</Text>
              <Text style={styles.salaText}>
                {job.location?.length > 1
                  ? `${job.location[0]} & other`
                  : job.location[0]}
              </Text>
            </View>
          </View>
        </View>
      ) : (
        <Text>No data available</Text>
      )}
    </View>
  );
};

export default HeaderJobDetail;
