import {
  StyleSheet,
  View,
  Text,
  Modal,
  Dimensions,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";

import { FONT, SIZES } from "../../../constants";
import { useAuth } from "../../../app/context/AuthContext";

const { height, width } = Dimensions.get("screen");

const ModalDialog = ({ visible, setVisible }) => {

  const {onLogout} = useAuth() 

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={() => setVisible(!visible)}
    >
      <View style={styles.modalLayout}>
        <TouchableWithoutFeedback onPress={() => setVisible(false)}>
          <View style={styles.modalMask}></View>
        </TouchableWithoutFeedback>
        <View style={styles.dialogContainer}>
          <Text style={styles.textContent}>Do you really want to log out?</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.buttonItem, { backgroundColor: "#ECECEC" }]}
              onPress={() => setVisible(false)}
            >
              <Text style={{ color: "black", fontFamily: FONT.medium }}>
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.buttonItem, { backgroundColor: "red" }]}
              onPress={() => {
                setVisible(false);
                onLogout();
              }}
            >
              <Text style={{ color: "#fff", fontFamily: FONT.medium }}>
                Log out
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalDialog;

const styles = StyleSheet.create({
  modalLayout: {
    position: "relative",
    height: height,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  modalMask: {
    height: height,
    position: "absolute",
    top: 0,
    width: "100%",
    backgroundColor: "#000000AA",
  },
  dialogContainer: {
    width: "90%",
    paddingHorizontal: 10,
    paddingVertical: 20,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 4,
  },
  textContent: {
    fontFamily: FONT.medium,
    fontSize: SIZES.medium,
    opacity: 0.5,
    width: "100%",
    textAlign: "center",
    marginBottom: 20,
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  buttonItem: {
    width: "48%",
    height: 40,
    fontFamily: FONT.medium,
    fontSize: SIZES.medium,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
});
