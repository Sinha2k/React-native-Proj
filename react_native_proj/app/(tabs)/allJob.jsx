import { Stack, useRouter } from "expo-router";
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, FlatList } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "../job-details/style";
import Filter from "../../components/utils/filter";
import { COLORS, FONT, SIZES } from "../../constants";
import data from "../../data/data";
import NearbyJob from '../../components/utils/card/nearby'
import { getAllJobs } from "../../redux/reducer/jobSliceReducer";

const AllJob = () => {
  const router = useRouter();

  const [jobList, setJobList] = useState(data);

  const dispatch = useDispatch()

  const jobListData = useSelector(state => state.jobs.jobList)

  useEffect(() => {
    dispatch(getAllJobs())
  }, [])

  return (
    <SafeAreaView style={{ backgroundColor: "#fff", flex: 1, marginBottom: 190 }}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 10,
        }}
      >
        <TouchableOpacity onPress={() => router.push("/home")}>
          <View style={styles.headerIcon}>
            <Ionicons name="arrow-back-outline" size={25} />
          </View>
        </TouchableOpacity>
        <Text
          style={[
            styles.headerTitleJob,
            { fontSize: SIZES.medium, marginLeft: 5 },
          ]}
        >
          All Jobs
        </Text>
      </View>
      <Filter />
      <View
        style={{
          backgroundColor: COLORS.lightWhite,
          paddingHorizontal: 15,
          paddingVertical: 10,
        }}
      >
        <Text style={{ fontFamily: FONT.medium, fontSize: 16, marginTop: 5, marginBottom: 10 }}>
          <Text style={{ color: COLORS.tertiary }}>{jobList?.length}</Text>{" "}
          results
        </Text>
        <ScrollView showsVerticalScrollIndicator={false} style={{paddingRight: 3, width: '100%'}}>
          <View>
            <FlatList 
              data={jobListData}
              renderItem={({item}) => (
                <TouchableOpacity>
                  <NearbyJob
                    job={item.attributes}
                    handleNavigate={() => router.push(`/job-details/${item.id}`)}
                  />
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.id}
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default AllJob;
