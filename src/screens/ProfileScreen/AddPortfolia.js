import { StyleSheet, Text, View, Alert } from "react-native";
import React, { useMemo, useState } from "react";
import { AssetsSelector } from "expo-images-picker";
import { Ionicons } from "@expo/vector-icons";
import { MediaType } from "expo-media-library";
import { api } from "../../../Constants";
const AddPortfolia = () => {
  const [uploadTotal, setUploadTotal] = useState(0);
  const [uploadProgress, setUploadProgress] = useState(0);
  const onSuccess = (data) => {
    Alert.alert("Done", data.length + "Images selected");
    console.log(data);
    // const xhr = new XMLHttpRequest();
    // xhr.addEventListener("load", (event) => handleUploadComplete(event));
    // xhr.upload.addEventListener("progress", handleUploadProgress);
    // const formData = new FormData();
    // formData.append("file", {
    //   uri: data,
    //   type: `image/jpg`,
    //   name: "new__profile",
    // });
    // xhr.open("PUT", `${api}/api/v1/cvs/portfolia`);
    // xhr.send(formData);
    // console.log(formData);
  };

  const widgetErrors = useMemo(
    () => ({
      errorTextColor: "black",
      errorMessages: {
        hasErrorWithPermissions: "Please Allow media gallery permissions.",
        hasErrorWithLoading: "There was an error while loading images.",
        hasErrorWithResizing: "There was an error while loading images.",
        hasNoAssets: "No images found.",
      },
    }),
    []
  );

  const widgetSettings = useMemo(
    () => ({
      getImageMetaData: false, // true might perform slower results but gives meta data and absolute path for ios users
      initialLoad: 100,
      assetsType: [MediaType.photo, MediaType.video],
      minSelection: 1,
      maxSelection: 6,
      portraitCols: 4,
      landscapeCols: 4,
    }),
    []
  );

  const widgetResize = useMemo(
    () => ({
      width: 50,
      compress: 0.7,
      base64: false,
      saveTo: "jpeg",
    }),
    []
  );

  const _textStyle = {
    color: "white",
  };

  const _buttonStyle = {
    backgroundColor: "orange",
    borderRadius: 5,
  };

  const widgetNavigator = useMemo(
    () => ({
      Texts: {
        finish: "finish",
        back: "back",
        selected: "selected",
      },
      midTextColor: "black",
      minSelection: 1,
      buttonTextStyle: _textStyle,
      buttonStyle: _buttonStyle,
      onBack: () => {},
      onSuccess: (e) => onSuccess(e),
    }),
    []
  );

  const widgetStyles = useMemo(
    () => ({
      margin: 2,
      bgColor: "white",
      spinnerColor: "blue",
      widgetWidth: 99,
      videoIcon: {
        Component: Ionicons,
        iconName: "ios-videocam",
        color: "tomato",
        size: 20,
      },
      selectedIcon: {
        Component: Ionicons,
        iconName: "ios-checkmark-circle-outline",
        color: "white",
        bg: "#0eb14970",
        size: 26,
      },
    }),
    []
  );

  const handleUploadComplete = () => {
    console.log("Upload completed!");
    setUploadProgress(0);
    setUploadTotal(0);
    // props.navigation.navigate("Detail", { id: bookId });
  };
  const handleUploadProgress = (event) => {
    if (uploadTotal === 0) setUploadTotal(event.total);
    setUploadProgress((uploadProgress) => {
      return Math.round((event.loaded * 100) / event.total);
    });
  };

  if (uploadTotal > 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ marginBottom: 20, fontWeight: "bold", fontSize: 16 }}>
          Түр хүлээнэ үү. Зургийг илгээж байна...
        </Text>

        <View
          style={{
            height: 50,
            backgroundColor: "red",
            width: 200,
          }}
        >
          <View
            style={{
              height: 50,
              backgroundColor: "green",
              width: uploadProgress * 2,
              alignItems: "center",
            }}
          >
            <Text style={{ color: "white", flex: 1, marginTop: 15 }}>
              {uploadProgress}%
            </Text>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <AssetsSelector
        Settings={widgetSettings}
        Errors={widgetErrors}
        Styles={widgetStyles}
        Navigator={widgetNavigator}
        Resize={widgetResize}
      />
    </View>
  );
};

export default AddPortfolia;

const styles = StyleSheet.create({});
