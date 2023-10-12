import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../../constants";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    display: 'flex',
    alignItems: 'center'
  },
  btn: (name, activeTab) => ({
    paddingVertical: SIZES.small,
    paddingHorizontal: SIZES.large,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: name === activeTab ? COLORS.tertiary : '#ECECEC',
    marginBottom: name === activeTab ? 1 : 0
  }),
  btnText: (name, activeTab) => ({
    fontFamily: "DMMedium",
    fontSize: SIZES.small,
    color: name === activeTab ? COLORS.tertiary : COLORS.gray,
  }),
});

export default styles;
