import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import React, { useMemo, useState } from "react";
import { useNavigation } from "@react-navigation/native";
const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;
import moment from "moment";
import * as ImagePicker from "expo-image-picker";
import { api } from "../../../Constants";

const EditProfileScreen = (props) => {
  const { data, experience, study } = props.route.params;
  const navigation = useNavigation();
  const [coverImage, setCoverImage] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const openImageProfileLibrary = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("zurgiin erhiig neene uu");
    }
    if (status === "granted") {
      const response = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
      });
      if (!response.cancelled) {
        setProfileImage(response.uri);
      }
    }
  };
  const openImageCoverLibrary = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("zurgiin erhiig neene uu");
    }
    if (status === "granted") {
      const response = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
      });
      if (!response.cancelled) {
        setCoverImage(response.uri);
      }
    }
  };
  const [uploadTotal, setUploadTotal] = useState(0);
  const [uploadProgress, setUploadProgress] = useState(0);
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
  const uploadProfileImage = async () => {
    const xhr = new XMLHttpRequest();
    const fileExt = profileImage.substring(profileImage.lastIndexOf(".") + 1);
    xhr.addEventListener("load", (event) => handleUploadComplete(event));
    xhr.upload.addEventListener("progress", handleUploadProgress);
    const formData = new FormData();
    formData.append("file", {
      uri: profileImage,
      type: `image/${fileExt}`,
      name: "new__profile",
    });
    xhr.open("PUT", `${api}/api/v1/cvs/profile`);
    xhr.send(formData);
  };
  const uploadCoverImage = async () => {
    const xhr = new XMLHttpRequest();
    const fileExt = coverImage.substring(coverImage.lastIndexOf(".") + 1);
    xhr.addEventListener("load", (event) => handleUploadComplete(event));
    xhr.upload.addEventListener("progress", handleUploadProgress);
    const formData = new FormData();
    formData.append("file", {
      uri: coverImage,
      type: `image/${fileExt}`,
      name: "new__profile",
    });
    xhr.open("PUT", `${api}/api/v1/cvs/cover`);
    xhr.send(formData);
  };
  if (uploadTotal > 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ marginBottom: 20, fontWeight: "bold", fontSize: 16 }}>
          ?????? ?????????????? ????. ?????????????? ???????????? ??????????...
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
    <ScrollView>
      {/* cover */}
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text> Cover ?????????? </Text>
        <Text onPress={openImageCoverLibrary}> ?????????????? </Text>
      </View>
      <Image
        source={{ uri: `${api}/upload/${data.cover}` }}
        // source={require("../../../assets/5.jpg")}
        style={{ width: windowWidth, height: 200 }}
      />
      {coverImage ? (
        <Text
          style={{
            textAlign: "center",
            fontSize: 30,
            backgroundColor: "cyan",
            alignSelf: "center",
            padding: 10,
            borderRadius: 20,
          }}
          onPress={uploadCoverImage}
        >
          ??????????????
        </Text>
      ) : null}

      {/* Propic */}
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text> ?????????????? ?????????? </Text>
        <Text onPress={openImageProfileLibrary}> ?????????????? </Text>
      </View>

      <Image // source={{ uri: `${api}/upload/${data.profile}` }}
        source={{ uri: `${api}/upload/${data.profile}` }}
        style={{
          width: 130,
          height: 130,
          borderRadius: 50,
          alignSelf: "center",
        }}
      />
      {profileImage ? (
        <Text
          style={{
            textAlign: "center",
            fontSize: 30,
            backgroundColor: "cyan",
            alignSelf: "center",
            padding: 10,
            borderRadius: 20,
          }}
          onPress={uploadProfileImage}
        >
          ??????????????
        </Text>
      ) : null}
      <View style={{ marginHorizontal: 20 }}>
        {/* ???????????? ???????????????? */}
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text>???????????? ????????????????</Text>
          <Text
            onPress={() =>
              navigation.navigate("EditPersonalDetailScreen", { data: data })
            }
          >
            ??????????????
          </Text>
        </View>
        <Text>
          ???????? ??????: {data.lastName} {data.firstName}
        </Text>
        <Text>
          ???????????? ???? ?????? ????????: {moment(data.birth).format("YYYY????MM??????DD")}{" "}
        </Text>
        <Text>??-???????? ????????: {data.email} </Text>
        <Text>???????????? ????????????: {data.phone} </Text>
        <Text>????????????????: {data.profession}</Text>
        {/* ?????????? ?????????????????? */}
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text>?????????? ????????????????</Text>
          <Text
            onPress={() =>
              navigation.navigate("EditWorkDetailScreen", { data: experience })
            }
            style={{ color: "red" }}
          >
            ??????????????
          </Text>
        </View>
        {experience.map((e, index) => {
          return (
            <View key={index} style={{ backgroundColor: "grey" }}>
              <Text> {e.company} </Text>
              <Text> {e.occupation} </Text>
              <Text> {e.position} </Text>
              <Text> {e.type} </Text>
              <Text> {e.location} </Text>
              <Text> {e.description} </Text>
              <Text>??????????????????: {moment(e.start).format("YYYY????MM??????DD")} </Text>
              {e.isWorking === true ? (
                <Text style={{ color: "green" }}> Ajillaj bgaa </Text>
              ) : (
                <Text>
                  ???????????????? ????????????: {moment(e.end).format("YYYY???? MM?????? DD")}
                </Text>
              )}
            </View>
          );
        })}
        {/* ?????????????????? */}
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text>Education</Text>
          <Text
            onPress={() =>
              navigation.navigate("EditEducationDetailScreen", { data: study })
            }
            style={{ color: "red" }}
          >
            ??????????????
          </Text>
        </View>
        {study.map((e, index) => {
          return (
            <View key={index}>
              <Text> {e.school} </Text>
              <Text> {e.field} </Text>
              <Text> {moment(e.start).format("YYYY????MM??????DD")} </Text>
              {e.isStudying === true ? (
                <Text style={{ color: "green" }}> Surj bgaa </Text>
              ) : (
                <Text>
                  Suraas ????????????: {moment(e.end).format("YYYY???? MM?????? DD")}
                </Text>
              )}
              <Text> {e.description} </Text>
            </View>
          );
        })}
        {/* ?????????????????? */}
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text>Portf</Text>
          <Text
            onPress={() => navigation.navigate("AddPortfolia")}
            style={{ color: "red" }}
          >
            ??????????????
          </Text>
        </View>
        <View>
          <View
            style={{
              flexDirection: "row",
              marginVertical: 10,
            }}
          >
            <Image
              style={{
                width: windowWidth / 3.5,
                height: 120,
                backgroundColor: "black",
                margin: 5,
              }}
            />
            <Image
              style={{
                width: windowWidth / 3.5,
                height: 120,
                backgroundColor: "cyan",
                margin: 5,
              }}
            />
            <Image
              style={{
                width: windowWidth / 3.5,
                height: 120,
                backgroundColor: "blue",
                margin: 5,
              }}
            />
          </View>
          <View style={{ flexDirection: "row", marginVertical: 5 }}>
            <Image
              style={{
                width: windowWidth / 3.5,
                height: 120,
                backgroundColor: "black",
                margin: 5,
              }}
            />
            <Image
              style={{
                width: windowWidth / 3.5,
                height: 120,
                backgroundColor: "cyan",
                margin: 5,
              }}
            />
            <Image
              style={{
                width: windowWidth / 3.5,
                height: 120,
                backgroundColor: "blue",
                margin: 5,
              }}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({});
