import { View, Text, TouchableOpacity, Image } from "react-native";

import { icons } from "../../../../constants";

import styles from "./popular.style";

const salaryValue = (salary) => {
  if (salary?.from > 0 && salary?.to > 0)
    return `${salary?.from} - ${salary?.to}`;
  else if (salary?.from > 0 && salary?.to === 0) return `Tren ${salary?.from}`;
  else if (salary?.from === 0 && salary?.to > 0) return `Duoi ${salary?.to}`;
  else return "Negotiable";
};

const PopularCard = ({ job, handleNavigate }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={handleNavigate}>
      <TouchableOpacity>
        <Image
          source={{ uri: job.logo }}
          resizeMode="contain"
          style={styles.logo}
        />
      </TouchableOpacity>
      <Text style={styles.company}>{job.company?.name}</Text>
      <Text style={styles.title}>
        {job.title.length > 40 ? job.title.slice(0, 36) + "..." : job.title}
      </Text>
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
          }}
        >
          <Image style={{ width: 20, height: 20 }} source={icons.location} />
          <Text style={styles.locateText}>
            {job.location?.length > 1
              ? `${job.location[0]}&other`
              : job.location[0]}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PopularCard;
