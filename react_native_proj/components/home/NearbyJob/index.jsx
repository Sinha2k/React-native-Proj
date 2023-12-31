import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";

import styles from "../PopularJob/popularjob.style";
import NearbyCard from "../../utils/card/nearby";
import data from '../../../data/data.js'

const NearbyJob = () => {
  const router = useRouter();

  const jobList = useSelector(state => state.jobs.jobList)

  const dataSkeleton = [1, 2, 3, 4, 5]

  return (
    <View style={styles.container}>
      <View style={styles.textwrap}>
        <Text style={styles.title}>Nearby Jobs</Text>
        <TouchableOpacity>
          <Text onPress={() => router.push('/allJob')} style={styles.show}>Show all</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.flatlist}>
        <FlatList
          data={jobList ? jobList : dataSkeleton}
          renderItem={({ item }) => (
            <TouchableOpacity>
              <NearbyCard
                job={item.attributes}
                handleNavigate={() => router.push(`/job-details/${item.id}`)}
              />
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

export default NearbyJob;
