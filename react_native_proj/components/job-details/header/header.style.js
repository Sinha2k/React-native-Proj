import { StyleSheet } from "react-native";

import { SIZES, COLORS, SHADOWS, FONT } from "../../../constants";

const styles = StyleSheet.create({
  headerContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    flex: 1,
    alignItems: 'center'
  },
  headerImage: {
    width: "100%",
    height: 240,
  },
  headerContent: {
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: "space-between",
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 10,
    position: "absolute",
    top: '50%',
    ...SHADOWS.small,
    borderRadius: 5,
    width: '90%'
  },
  companyContent: {
    marginTop: -50 ,
    padding: 8,
    borderRadius: 5,
    backgroundColor: '#fff',
    ...SHADOWS.small,
  },
  title: {
    fontFamily: FONT.bold,
    marginTop: 15,
    opacity: 0.8,
    textAlign: 'center'
  },
  company: {
    fontFamily: FONT.regular,
    marginTop: 8,
    opacity: 0.8
  },
  sala_loca_container: {
    display: "flex",
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 15,
    borderTopWidth: 1,
    borderColor: '#ECECEC',
    paddingTop: 15
  },
  sala: {
    flex: 1,
    alignItems: 'center',
    width: '50%',
    borderRightWidth: 1,
    borderColor: '#ECECEC',
  },
  loca: {
    flex: 1,
    alignItems: 'center',
    width: '50%'
  },
  salaText: {
    fontSize: SIZES.small,
    opacity: 1,
    fontFamily: FONT.bold,
    color: COLORS.tertiary,
    marginTop: 5
  },
});

export default styles;
