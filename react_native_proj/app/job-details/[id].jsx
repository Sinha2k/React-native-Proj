import { Stack, useRouter, useSearchParams } from "expo-router";
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons'
import { useEffect, useState } from "react";

import styles from "./style";
import HeaderJobDetail from "../../components/job-details/header";
import data from '../../data/data'
import JobDetailBody from "../../components/job-details/body";

const tabs = ["Information", "Company", "Related Job"]

const JobDetails = () => {
  const params = useSearchParams();
  const router = useRouter()
  const [jobDetail, setJobDetail] = useState()
  const [activeTab, setActiveTab] = useState("Information")

  useEffect(() => {
    if (params.id) {
        const job = data.find(item => item.id == params.id)
        setJobDetail(job)
    }
  }, [params.id])

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
        <Stack.Screen 
            options={{
                headerShadowVisible: false,
                headerBackVisible: false,
                headerTransparent:  true,
                headerLeft: () => (
                    <TouchableOpacity onPress={() => router.push('/home')}>
                        <View style={styles.headerIcon}><Ionicons name="arrow-back-outline" size={25}/></View>
                    </TouchableOpacity>
                ),
                headerRight: () => (
                    <TouchableOpacity>
                        <View style={styles.headerIcon}><Ionicons name="ellipsis-horizontal" size={25}/></View>
                    </TouchableOpacity>
                ),
                headerTitle: '',
            }}
        />
        <HeaderJobDetail job={jobDetail} />
        <ScrollView style={{flex: 1,marginTop: 275}}>
            <JobDetailBody activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} job={jobDetail} />
        </ScrollView>
    </SafeAreaView>
  );
};

export default JobDetails;
