import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import styles from "../information/style";
import NearbyCard from "../../../utils/card/nearby";
import { useSelector } from "react-redux";
import { FONT } from "../../../../constants";

const RelatedJob = ({ job }) => {
  const jobList = useSelector((state) => state.jobs.jobList);

  const newJobData = jobList.filter(
    (item) => item.attributes?.level === job?.level
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Related Job</Text>
      {newJobData?.length > 0 ? (
        <View>
          <ScrollView>
            {newJobData.map((item, index) => (
              <TouchableOpacity key={index}>
                <NearbyCard job={item.attributes} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      ) : (
        <View>
          <Text style={{fontFamily: FONT.medium, marginTop: 10}}>No related job</Text>
        </View>
      )}
    </View>
  );
};
export default RelatedJob;
