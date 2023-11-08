import { Stack, useRouter, useSearchParams } from "expo-router";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./style";
import HeaderJobDetail from "../../components/job-details/header";
import JobDetailBody from "../../components/job-details/body";
import { getJobById } from "../../redux/reducer/jobSliceReducer";

const tabs = ["Information", "Company", "Related Job"];

const JobDetails = () => {
  const params = useSearchParams();
  const router = useRouter();
  const [jobDetail, setJobDetail] = useState();
  const [activeTab, setActiveTab] = useState("Information");

  const dispatch = useDispatch();

  const jobDetailData = useSelector((state) => state.jobs.jobDetail);

  
  useEffect(() => {
    if (params.id) {
      dispatch(getJobById(params.id));
    }
  }, [params.id]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <Stack.Screen
        options={{
          headerShadowVisible: false,
          headerBackVisible: false,
          headerTransparent: true,
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.push("/home")}>
              <View style={styles.headerIcon}>
                <Ionicons name="arrow-back-outline" size={25} />
              </View>
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity>
              <View style={styles.headerIcon}>
                <Ionicons name="ellipsis-horizontal" size={25} />
              </View>
            </TouchableOpacity>
          ),
          headerTitle: "",
        }}
      />

      {jobDetailData ? (
        <>
          <HeaderJobDetail job={jobDetailData} />
          <ScrollView style={{ flex: 1, marginTop: 275 }}>
            <JobDetailBody
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              tabs={tabs}
              job={jobDetailData}
            />
          </ScrollView>
        </>
      ) : (
        <Text>No data available</Text>
      )}
    </SafeAreaView>
  );
};

export default JobDetails;
