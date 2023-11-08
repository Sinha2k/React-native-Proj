import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { useRouter } from "expo-router";

import styles from "./popularjob.style";
import PopularCard from "../../utils/card/popular";
import data from "../../../data/data.js";
import { useSelector } from "react-redux";

const PopularJob = () => {
  const router = useRouter();

  const dataSkeleton = [1, 2, 3]

  const jobList = useSelector(state => state.jobs.jobList)

  return (
    <View style={[styles.container]}>
      <View style={styles.textwrap}>
        <Text style={styles.title}>Popular Jobs</Text>
        <TouchableOpacity>
          <Text onPress={() => router.push("/allJob")} style={styles.show}>
            Show all
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.flatlist}>
        <FlatList
          data={jobList ? jobList : dataSkeleton}
          renderItem={({ item }) => (
            <TouchableOpacity>
              <PopularCard
                handleNavigate={() => router.push(`/job-details/${item.id}`)}
                job={item.attributes}
              />
            </TouchableOpacity>
          )}
          key={(item) => item.id}
          keyExtractor={(item) => item.id}
          horizontal
          contentContainerStyle={{ columnGap: "15px" }}
        />
      </View>
    </View>
  );
};

export default PopularJob;
