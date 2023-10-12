import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";

import styles from "./popularjob.style";
import PopularCard from "../../utils/card/popular";
import data from '../../../data/data.js'

const PopularJob = () => {
  return (
    <View style={[styles.container]}>
      <View style={styles.textwrap}>
        <Text style={styles.title}>Popular Jobs</Text>
        <TouchableOpacity>
          <Text style={styles.show}>Show all</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.flatlist}>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <TouchableOpacity>
              <PopularCard job={item} />
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
