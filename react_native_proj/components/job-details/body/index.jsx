import { View, Text, TouchableOpacity } from "react-native";

import styles from "./body.style";
import Information from "../tabs/information";
import Company from "../tabs/company";
import RelatedJob from "../tabs/jobs";

function TabButton({ name, activeTab, onHandleClick }) {
  return (
    <TouchableOpacity
      style={styles.btn(name, activeTab)}
      onPress={onHandleClick}
    >
      <Text style={styles.btnText(name, activeTab)}>{name}</Text>
    </TouchableOpacity>
  );
}

function RenderTabContent(activeTab, job) {
  switch (activeTab) {
    case "Information":
      return <Information job={job} />;
    case "Company":
      return <Company job={job} />;
    case "Related Job":
      return <RelatedJob job={job} />;
    default:
  }
}

const JobDetailBody = ({ job, tabs, activeTab, setActiveTab }) => {
  return (
    <>
      <View style={styles.container}>
        <View style={{display: 'flex', flexDirection: 'row'}}>
        {tabs.map((item, index) => (
          <TabButton
            key={index}
            name={item}
            activeTab={activeTab}
            onHandleClick={() => setActiveTab(item)}
          />
        ))}
        </View>
      </View>
      <View>{RenderTabContent(activeTab, job)}</View>
    </>
  );
};
export default JobDetailBody;
