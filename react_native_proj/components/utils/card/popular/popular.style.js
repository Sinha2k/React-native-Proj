import { StyleSheet } from "react-native";

import { SIZES, COLORS, SHADOWS, FONT } from "../../../../constants";

const styles = StyleSheet.create({
  card: {
    width: 200,
    backgroundColor: "#FFF",
    padding: SIZES.medium,
    marginLeft: 5,
    marginTop: 5,
    marginBottom: 5,
    justifyContent: "space-between",
    borderRadius: SIZES.small,
    shadowColor: COLORS.white,
    ...SHADOWS.small,
  },
  logo: {
    width: 70,
    height: 60,
  },
  company: {
    fontSize: SIZES.xSmall,
    color: COLORS.gray2,
  },
  title: {
    fontSize: SIZES.small,
    marginTop: 8,
    height: 36
  },
  sala_loca: {
    display: "flex",
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8
  },
  salaContainer:{
    backgroundColor: COLORS.white,
    borderRadius: 4,
    padding: 5
  },
  salaText:{
    fontSize: SIZES.xSmall,
    color: COLORS.tertiary
  },
  locateText: {
    fontSize: SIZES.xSmall
  }
});

export default styles;
