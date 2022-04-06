import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  Pressable,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { api } from "../../../Constants";

import {
  AntDesign,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
const PostDetailScreen = (props) => {
  const { id } = props.route.params;
  const [postData, setPostData] = useState([]);
  const windowWidth = Dimensions.get("window").width;
  const networkingData = () => {
    axios
      .get(`${api}/api/v1/posts/${id}`)
      .then((result) => {
        setPostData(result.data.data);
      })
      .catch((err) => console.log(err));
  };
  const likeData = () => {
    axios
      .post(`${api}/api/v1/likes/${id}`)
      .then((result) => {
        // setPostData(result.data.data);
        console.log(result.data.data);
      })
      .catch((err) => console.log(err));
  };
  const likeDeleteData = () => {
    axios
      .delete(`${api}/api/v1/likes/${id}`)
      .then((result) => {
        console.log(result.data.data);
      })
      .catch((err) => console.log(err));
  };
  const commentData = () => {
    axios
      .get(`${api}/api/v1/comments`)
      .then((result) => console.log(result.data.data))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    networkingData();
    commentData();
  }, []);
  const [liked, setLiked] = useState(false);
  const likedFunction = () => {
    setLiked((isLiked) => !isLiked);
    if (liked === false) {
      likeData();
    } else {
      likeDeleteData();
    }
  };
  return (
    <ScrollView>
      <View style={{ backgroundColor: "white", paddingVertical: 20 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginVertical: 20,
          }}
        >
          <Image
            source={require("../../../assets/1.jpg")}
            style={{ width: 50, height: 50, borderRadius: 100 }}
          />
          <View>
            <Text>Tseke Skrrr</Text>
            <Text style={{ color: "grey" }}>Programmist</Text>
          </View>
          <Text style={{ color: "grey" }}>3d</Text>
        </View>
        <Image
          source={{ uri: `${api}/upload/${postData.photo}` }}
          style={{ width: windowWidth, height: 200 }}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: 20,
          }}
        >
          <Pressable onPress={() => likedFunction()}>
            <View style={{ flexDirection: "row" }}>
              <MaterialCommunityIcons
                name={liked ? "heart" : "heart-outline"}
                size={32}
                color={liked ? "red" : "black"}
              />
              <Text style={{ alignSelf: "center" }}> {postData.like} </Text>
            </View>
          </Pressable>
          <TouchableOpacity style={{ flexDirection: "row" }}>
            <FontAwesome name="commenting-o" size={24} color="black" />
            <Text style={{ alignSelf: "center" }}>{postData.comment}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ flexDirection: "row" }}>
            <AntDesign name="sharealt" size={24} color="black" />
            <Text style={{ alignSelf: "center" }}>{postData.share}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default PostDetailScreen;

const styles = StyleSheet.create({});
