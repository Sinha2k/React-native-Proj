import { StyleSheet } from "react-native";
import { COLORS, FONT, SIZES } from "../../constants";

const styles = StyleSheet.create({
  headerIcon: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 100,
  },
  headerTitleJob: {
    fontFamily: FONT.bold,
  },
  bottomButton: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 18,
    paddingTop: 12,
    paddingBottom: 23,
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#fff",
  },
  buttonIcon: {
    paddingVertical: 5,
    paddingHorizontal: 6,
    borderRadius: 7,
    display: "flex",
    justifyContent: "center",
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.tertiary
  },
  button: {
    borderRadius: 20,
    height: 40,
    width: "85%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 7,
    borderColor: COLORS.tertiary,
  },
  buttonText: {
    fontFamily: FONT.medium,
    fontSize: SIZES.medium,
  },
});

export default styles;
