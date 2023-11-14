import { Stack } from "expo-router";
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import NumericInput from "react-native-numeric-input";
import { useState, useEffect } from "react";

import { COLORS, FONT } from "../../constants";
import BottomModal from "../../components/utils/modal";
import useFetchData from "../../components/utils/filter/api";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../../components/utils/loading/loading";
import { createJob, getAllJobs } from "../../redux/reducer/jobSliceReducer";

const sexData = ["Male", "Female"];
const typeData = ["Fulltime", "Parttime", "On board"];
const levelData = [
  "Intern",
  "Fresher",
  "Junior",
  "Middle",
  "Senior",
  "Project Manager",
];

const AddJob = () => {
  const account = useSelector((state) => state.employer.account);

  const initialState = {
    title: "",
    number: 0,
    sex: "",
    type: "",
    level: "",
    salary: {
      from: 0,
      to: 0,
    },
    experiment: {
      from: 0,
      to: 0,
    },
    location: [],
    company: account.company?.data?.id,
  };

  const [jobData, setJobData] = useState(initialState);

  const renderNumericInput = (key, props) => {
    return (
      <NumericInput
        containerStyle={{ display: "flex", flexDirection: "row" }}
        totalWidth={100}
        totalHeight={35}
        rounded
        textColor={COLORS.tertiary}
        type="plus-minus"
        onChange={(value) =>
          key === "number"
            ? setJobData({ ...jobData, [key]: value })
            : key === "salary"
            ? setJobData({
                ...jobData,
                ["salary"]: { ...jobData.salary, [props]: value },
              })
            : setJobData({
                ...jobData,
                ["experiment"]: { ...jobData.experiment, [props]: value },
              })
        }
        inputStyle={{ width: 40 }}
      />
    );
  };

  const [visible, setVisible] = useState(false);

  const status = useSelector(state => state.jobs.status)

  const { provinceData, err } = useFetchData();

  const [keyFilter, setKeyFilter] = useState("");

  const [dataFilter, setDataFilter] = useState({
    sex: sexData,
    type: typeData,
    level: levelData,
    location: [],
  });

  useEffect(() => {
    if (provinceData) {
      setDataFilter({ ...dataFilter, ["location"]: provinceData });
    }
  }, [provinceData]);

  const selectOption = (option) => {
    setVisible(true);
    setKeyFilter(option);
  };

  const dispatch = useDispatch()

  const handleCreateJob = async (inputData) => {
      await dispatch(createJob(inputData))
      dispatch(getAllJobs())
      setJobData(initialState)
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingVertical: "5%",
        width: "100%",
        backgroundColor: COLORS.lightWhite,
      }}
    >
      <Stack.Screen
        options={{
          headerShown: true,
          headerShadowVisible: false,
          headerTitle: () => (
            <Text style={{ fontFamily: FONT.bold, fontSize: 16 }}>
              Creat Job
            </Text>
          ),
        }}
      />
      <View style={styles.container}>
        <Text style={styles.desc}>Tiltle</Text>
        <View style={styles.textInputContainer}>
          <TextInput
            value={jobData.title}
            onChangeText={(value) => setJobData({ ...jobData, title: value })}
            style={styles.textInput}
            placeholder="Enter job title"
          />
          <Ionicons
            style={styles.textInputIcon}
            name="text-outline"
            size={20}
          />
        </View>
      </View>
      <View
        style={[
          styles.container,
          {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          },
        ]}
      >
        <View style={styles.item}>
          <Text style={styles.desc}>Quantity</Text>
          {renderNumericInput("number", "")}
        </View>
        <View style={{ width: "40%" }}>
          <Text style={styles.desc}>Sex</Text>
          <TouchableOpacity
            onPress={() => selectOption("sex")}
            style={styles.dropdownContainer}
          >
            <Text style={styles.dropdownText}>
              {jobData.sex ? jobData.sex : "Select sex"}
            </Text>
            <Ionicons style={{ opacity: 0.4 }} name="chevron-down" size={20} />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={[
          styles.container,
          {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          },
        ]}
      >
        <View style={{ width: "40%" }}>
          <Text style={styles.desc}>Type</Text>
          <TouchableOpacity
            onPress={() => selectOption("type")}
            style={styles.dropdownContainer}
          >
            <Text style={styles.dropdownText}>
              {jobData.type ? jobData.type : "Select type"}
            </Text>
            <Ionicons style={{ opacity: 0.4 }} name="chevron-down" size={20} />
          </TouchableOpacity>
        </View>
        <View style={{ width: "52%" }}>
          <Text style={styles.desc}>Level</Text>
          <TouchableOpacity
            onPress={() => selectOption("level")}
            style={styles.dropdownContainer}
          >
            <Text style={styles.dropdownText}>
              {jobData.level ? jobData.level : "Select level"}
            </Text>
            <Ionicons style={{ opacity: 0.4 }} name="chevron-down" size={20} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.container}>
        <Text style={styles.desc}>Salary (trieu VND)</Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 5,
          }}
        >
          <View>
            <Text style={styles.textItem}>From</Text>
            {renderNumericInput("salary", "from")}
          </View>
          <View>
            <Text style={styles.textItem}>To</Text>
            {renderNumericInput("salary", "to")}
          </View>
        </View>
      </View>
      <View style={styles.container}>
        <Text style={styles.desc}>Experiment (years)</Text>
        <View
          style={{
            marginTop: 5,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text style={styles.textItem}>From</Text>
            {renderNumericInput("experiment", "from")}
          </View>
          <View>
            <Text style={styles.textItem}>To</Text>
            {renderNumericInput("experiment", "to")}
          </View>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => selectOption("location")}
        style={styles.container}
      >
        <Text style={styles.desc}>Location</Text>
        <View style={styles.dropdownContainer}>
          <Text style={styles.dropdownText}>
            {jobData.location?.length >= 1
              ? jobData.location?.map((item) => item + ", ")
              : "Select location"}
          </Text>
          <Ionicons style={{ opacity: 0.4 }} name="chevron-down" size={20} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleCreateJob(jobData)}>
        <View
          style={[
            styles.container,
            {
              backgroundColor: COLORS.tertiary,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              paddingVertical: 10,
              borderRadius: 20,
              marginTop: 10,
            },
          ]}
        >
          <Text style={{ fontFamily: FONT.bold, fontSize: 18, color: "#fff" }}>
            Create
          </Text>
        </View>
      </TouchableOpacity>
      {status === "loading" && <Loading />}
      <BottomModal
        visible={visible}
        setVisible={setVisible}
        keyFilter={keyFilter}
        data={dataFilter}
        setChooseFilter={setJobData}
        chooseFilter={jobData}
        setDataFilter={setDataFilter}
        placeData={provinceData}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "90%",
    marginLeft: "5%",
    marginBottom: 15,
  },
  desc: {
    fontFamily: FONT.bold,
    marginBottom: 5,
  },
  textInputContainer: {
    width: "100%",
    backgroundColor: "#fff",
    position: "relative",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#ECECEC",
  },
  textInput: {
    width: "100%",
    paddingLeft: 40,
    paddingVertical: 10,
  },
  textInputIcon: {
    position: "absolute",
    left: 10,
    top: 9,
    opacity: 0.3,
  },
  item: {},
  textItem: {
    fontFamily: FONT.medium,
    fontSize: 10,
    marginBottom: 3,
  },
  dropdownContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ECECEC",
    width: "100%",
  },
  dropdownText: {
    fontFamily: FONT.regular,
    fontSize: 13,
  },
});

export default AddJob;
