import { View, Text, TouchableOpacity, Image } from "react-native";

import { COLORS, FONT, icons } from "../../../../constants";
import styles from "./nearby.style";

const salaryValue = (salary) => {
  if (salary?.from > 0 && salary?.to > 0)
    return `${salary?.from} - ${salary?.to}`;
  else if (salary?.from > 0 && salary?.to === 0) return `Tren ${salary?.from}`;
  else if (salary?.from === 0 && salary?.to > 0) return `Duoi ${salary?.to}`;
  else return "Negotiable";
};

const expValue = (exp) => {
  if (exp?.from > 0 && exp?.to > 0) return `${exp?.from} - ${exp?.to}`;
  else if (exp?.from > 0 && exp?.to === 0) return `Tren ${exp?.from}`;
  else if (exp?.from === 0 && exp?.to > 0) return `Duoi ${exp?.to}`;
  else return "No experiment required";
};

const NearbyCard = ({ job, handleNavigate }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={handleNavigate}>
      <TouchableOpacity>
        <Image
          source={{ uri: job.logo }}
          resizeMode="contain"
          style={styles.logo}
        />
      </TouchableOpacity>
      <View
        style={{
          width: "80%",
        }}
      >
        <Text style={styles.title}>
          {job.title.length > 30 ? job.title.slice(0, 30) + "..." : job.title}
        </Text>
        <Text style={styles.company}>{job.company?.name}</Text>
        <View style={styles.sala_loca}>
          <View style={styles.salaContainer}>
            <Text style={styles.salaText}>{`${salaryValue(job?.salary)}${
              salaryValue(job?.salary) === "Negotiable" ? "" : " M"
            }`}</Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              opacity: 0.5,
              marginLeft: 10,
            }}
          >
            <Image style={{ width: 20, height: 20 }} source={icons.location} />
            <Text style={styles.locateText}>
              {job.location?.length > 1
                ? `${job.location[0]} & other`
                : job.location[0]}
            </Text>
          </View>
        </View>
        <Text
          style={{
            fontFamily: FONT.medium,
            color: COLORS.tertiary,
            fontSize: 10,
            marginTop: 8,
          }}
        >{`${expValue(job?.experiment)}${
          expValue(job?.experiment) === "No experiment required" ? "" : " years"
        }`}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default NearbyCard;
