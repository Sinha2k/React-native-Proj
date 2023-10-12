import { View, Text, FlatList, TouchableOpacity } from "react-native";

import styles from "../information/style";
import NearbyCard from "../../../utils/card/nearby";
import data from "../../../../data/data";

const RelatedJob = ({ job }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Related Job</Text>
      <View>
        <FlatList
          data={data.filter((item) => item.level === job?.level)}
          renderItem={({ item }) => (
            <TouchableOpacity>
              <NearbyCard job={item} />
            </TouchableOpacity>
          )}
          key={(item) => item.id}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ columnGap: "15px" }}
        />
      </View>
    </View>
  );
};
export default RelatedJob;
