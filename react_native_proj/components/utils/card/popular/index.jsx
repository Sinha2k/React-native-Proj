import { View, Text, TouchableOpacity, Image } from "react-native";
import { useSelector } from "react-redux";

import { icons } from "../../../../constants";

import styles from "./popular.style";
import Skeleton from "../../skeleton";

const salaryValue = (salary) => {
  if (salary?.from > 0 && salary?.to > 0)
    return `${salary?.from} - ${salary?.to}`;
  else if (salary?.from > 0 && salary?.to === 0) return `Tren ${salary?.from}`;
  else if (salary?.from === 0 && salary?.to > 0) return `Duoi ${salary?.to}`;
  else return "Negotiable";
};

const PopularCard = ({ job, handleNavigate }) => {
  const status = useSelector((state) => state.jobs.status);

  const renderSkeletonCard = () => {
    return (
      <View style={styles.card}>
        <Skeleton width={70} style={{ height: 60 }} />
        <Skeleton width={168} style={{ height: 15, marginTop: 15 }} />
        <Skeleton width={168} style={{ height: 15, marginTop: 10 }} />
        <View style={styles.sala_loca}>
          <Skeleton width={80} style={{ height: 20 }} />
          <Skeleton width={80} style={{ width: 50, height: 20 }} />
        </View>
      </View>
    );
  };

  return status === "loading" || !job ? (
    renderSkeletonCard()
  ) : (
    <TouchableOpacity style={styles.card} onPress={handleNavigate}>
      <TouchableOpacity>
        <Image
          source={{
            uri: job.company.data.attributes.logo.data
              ? job.company.data.attributes.logo.data.attributes.url
              : "https://icons.veryicon.com/png/o/miscellaneous/zr_icon/company-23.png",
          }}
          resizeMode="contain"
          style={styles.logo}
        />
      </TouchableOpacity>
      <Text style={styles.company}>{job.company?.data.attributes.name}</Text>
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
