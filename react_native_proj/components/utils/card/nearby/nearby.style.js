import { StyleSheet } from "react-native";

import { SIZES, COLORS, SHADOWS } from "../../../../constants";

const styles = StyleSheet.create({
  card: {
    width: '100%',
    backgroundColor: "#FFF",
    padding: SIZES.medium,
    marginLeft: 5,
    marginTop: 5,
    marginBottom: 5,
    justifyContent: "space-between",
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: SIZES.small,
    shadowColor: COLORS.white,
    ...SHADOWS.small,
  },
  logo: {
    width: 45,
    height: 45,
  },
  company: {
    fontSize: SIZES.xSmall,
    color: COLORS.gray2,
  },
  title: {
    fontSize: SIZES.small,
    marginBottom: 6
  },
  sala_loca: {
    display: "flex",
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8
  },
  salaContainer:{
    backgroundColor: COLORS.white,
    borderRadius: 4,
    padding: 5
  },
  salaText:{
    fontSize: SIZES.xSmall,
    opacity: 0.5
  },
  locateText: {
    fontSize: SIZES.xSmall
  }
});

export default styles;
