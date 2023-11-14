import {
  StyleSheet,
  View,
  Text,
  Modal,
  Dimensions,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { useState } from "react";
// import Pdf from "react-native-pdf";
import axios from "axios";

import { COLORS, FONT, SIZES } from "../../../constants";
import { showToast } from "../../../app/context/AuthContext";

const { height, width } = Dimensions.get("screen");

const ModalUploadCV = ({ visible, setVisible, applyId, setLoading }) => {
  const [pdf, setPdf] = useState();

  const selectDoc = async () => {
    try {
      const doc = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
      });
      setPdf(doc.assets[0]);
    } catch (err) {
      console.log("Error while selecting file", err);
    }
  };

  const onUploadCv = async (pdf) => {
    setVisible(false)
    if (pdf && applyId) {
      setLoading(true);
      const formData = new FormData();
      formData.append('files', {
        uri: pdf.uri,
        name: pdf.name.split(".")[0],
        type: pdf.mimeType,
        size: pdf.size,
      });
      formData.append("ref", "api::apply.apply");
      formData.append("refId", applyId);
      formData.append("field", "cv");
      try {
        await axios.post("https://72cb-27-69-6-204.ngrok-free.app/api/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        showToast("Upload cv success", COLORS.tertiary);
        setLoading(false)
      } catch (err) {
        showToast(err.response.data);
        setLoading(false)
      }
    }
  };

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
          <Text style={styles.textContent}>
            You need to upload your cv before apply job
          </Text>
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <TouchableOpacity
              onPress={() => selectDoc()}
              style={styles.pdfContainer}
            >
              {/* {pdf ? (
                <Pdf
                  source={source}
                  onLoadComplete={(numberOfPages, filePath) => {
                    console.log(`Number of pages: ${numberOfPages}`);
                  }}
                  onPageChanged={(page, numberOfPages) => {
                    console.log(`Current page: ${page}`);
                  }}
                  onError={(error) => {
                    console.log(error);
                  }}
                  onPressLink={(uri) => {
                    console.log(`Link pressed: ${uri}`);
                  }}
                  style={styles.pdf}
                />
              ) : ( */}
                <Image
                    style={{ width: "100%", height: 80, marginBottom: 5 }}
                    resizeMode="contain"
                    source={{
                    uri: "https://cdn-icons-png.flaticon.com/512/80/80942.png",
                    }}
                />
              {/* )} */}
              <Text style={styles.pdfText}>{pdf ? "1 file has uploaded" : "Upload your cv here"}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.buttonItem, { backgroundColor: "#ECECEC" }]}
              onPress={() => setVisible(false)}
            >
              <Text style={{ color: COLORS.tertiary, fontFamily: FONT.medium }}>
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.buttonItem, { backgroundColor: COLORS.tertiary }]}
              onPress={() => {
                setVisible(false);
                onUploadCv(pdf);
              }}
            >
              <Text style={{ color: "#fff", fontFamily: FONT.medium }}>
                Continue
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalUploadCV;

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
  pdfContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    width: "40%",
    marginBottom: 15,
  },
  pdfText: {
    fontFamily: FONT.medium,
    fontSize: 10,
    opacity: 0.6,
  },
  pdf: {
    width: "100%",
    height: 80,
    marginBottom: 5,
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
