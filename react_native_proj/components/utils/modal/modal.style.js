import { Dimensions, StyleSheet } from "react-native";
import { COLORS, FONT } from "../../../constants";

const { height, width } = Dimensions.get("screen");

const styles = StyleSheet.create({
  modalLayout: {
    backgroundColor: "#000000AA",
    position: "relative",
    height: height,
  },
  modalMask: {
    height: height,
    position: "absolute",
    top: 0,
    width: "100%",
  },
  modalContainer: {
    backgroundColor: '#fff',
    maxHeight: 0.8 * height,
    minHeight: 0.3 * height,
    width: '100%',
    position: "absolute",
    bottom: 0,
    padding: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  closeButton: {
    backgroundColor: '#F8F8F8',
    borderRadius: 100,
    height: 22,
    width: 22,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  searchContainer: {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginTop: 20
  },
  searchInput: {
    paddingLeft: 30,
    paddingVertical: 7,
    backgroundColor: "#F8F8F8",
    borderRadius: 7,
    borderWidth: 1,
    borderColor: "#F8F8F8",
    color: "black",
    width: "100%",
  },
  searchIcon: {
    position: "absolute",
    left: 7,
    zIndex: 1000,
  },
  listContainer: {
    marginTop: 10,
    height: 'auto',
    marginBottom: 40
  },
  listItems: {
    width: '100%',
    display: 'flex',
    borderBottomColor: '#F8F8F8',
    borderBottomWidth: 1,
    paddingVertical: 10
  },
  textItem: {
    fontFamily: FONT.medium,
  },
});

export default styles;
