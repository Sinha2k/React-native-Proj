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
import axios from "axios";

import styles from "./style";
import HeaderJobDetail from "../../components/job-details/header";
import JobDetailBody from "../../components/job-details/body";
import { getJobById } from "../../redux/reducer/jobSliceReducer";
import { COLORS } from "../../constants";
import { showToast, useAuth } from "../context/AuthContext";
import Loading from "../../components/utils/loading/loading";
import ModalUploadCV from "../../components/utils/modal/modalUploadCv";

const tabs = ["Information", "Company", "Related Job"];

const api = "https://72cb-27-69-6-204.ngrok-free.app/api";

const JobDetails = () => {
  const params = useSearchParams();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [visible, setVisible] = useState(false);

  const [applyId, setApplyId] = useState();

  const [isApplied, setIsApplied] = useState(false);

  const [activeTab, setActiveTab] = useState("Information");

  const dispatch = useDispatch();

  const jobDetailData = useSelector((state) => state.jobs.jobDetail);

  const { authState } = useAuth();

  const roleName = authState.user?.role?.data?.attributes?.name;

  const employeeId = useSelector((state) => state.employee.employeeId);

  const applyJob = async (userId) => {
    if (params.id > 0 && userId > 0) {
      setLoading(true);
      try {
        const res = await axios.post(api + "/applies", {
          data: {
            employee: userId,
            job: params.id,
          },
        });
        setLoading(false);
        setApplyId(res.data.data.id);
        showToast("Apply success", COLORS.tertiary);
        setVisible(true);
      } catch (err) {
        setLoading(false);
        showToast(err.response.data, "red");
      }
    }
  };

  const getApply = async (userId, jobId) => {
    setLoading(true);
    try {
      const res = await axios.get(
        api +
          `/applies?filters[job][id][$eq]=${jobId}&filters[employee][id][$eq]=${userId}&populate=deep,3`
      );
      if (res.data.data?.length === 0) setIsApplied(false);
      else {
        setIsApplied(true)
        if (!res.data.data[0]?.attributes.cv?.data) {
          setVisible(true);
        }
      }
      setLoading(false);
    } catch (err) {
      showToast(err.response.data, "red");
    }
  };

  useEffect(() => {
    const loadJobApply = async (jobId, userId) => {
      if (jobId > 0 && userId > 0) {
        dispatch(getJobById(jobId));
        await getApply(userId, jobId);
      }
    };
    loadJobApply(params.id, employeeId);
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
          <ScrollView style={{ flex: 1, marginTop: 275, marginBottom: 30 }}>
            <JobDetailBody
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              tabs={tabs}
              job={jobDetailData}
            />
          </ScrollView>
          {roleName === "Employee" && (
            <View style={styles.bottomButton}>
              <TouchableOpacity
                onPress={() => {}}
                style={[styles.buttonIcon, { backgroundColor: "#fff" }]}
              >
                <Ionicons
                  color={COLORS.tertiary}
                  name="bookmark-outline"
                  size={25}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: COLORS.tertiary }]}
                onPress={() => applyJob(employeeId)}
              >
                <Text style={[styles.buttonText, { color: "#fff" }]}>
                  {isApplied ? "You has applied before" : "Apply now"}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </>
      ) : (
        <Text>No data available</Text>
      )}

      <ModalUploadCV
        visible={visible}
        setVisible={setVisible}
        applyId={applyId}
        setLoading={setLoading}
      />

      {loading && <Loading />}
    </SafeAreaView>
  );
};

export default JobDetails;
