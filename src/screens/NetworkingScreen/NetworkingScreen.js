import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";
import {
  AntDesign,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { api } from "../../../Constants";
const windowWidth = Dimensions.get("window").width;

const NetworkingScreen = () => {
  const navigation = useNavigation();
  const [postData, setPostData] = useState([]);

  const networkingData = () => {
    axios
      .get(`${api}/api/v1/posts?limit=100`)
      .then((result) => {
        setPostData(result.data.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    networkingData();
  }, []);
  const [liked, setLiked] = useState(false);
  const likedFunction = () => {
    setLiked((isLiked) => !isLiked);
    // if (liked === false) {
    //   likeData();
    // } else {
    //   likeDeleteData();
    // }
  };
  return (
    <ScrollView>
      <Text>NetworkingScreen</Text>

      {postData.map((e, index) => {
        return (
          <View key={index}>
            {e.isBoost === true && (
              <View style={{ backgroundColor: "white", paddingVertical: 20 }}>
                {e.createUser && (
                  <View
                    style={{
                      flexDirection: "row",
                      marginVertical: 10,
                      width: windowWidth,
                      justifyContent: "space-between",
                    }}
                  >
                    <View style={{ flexDirection: "row", marginLeft: 20 }}>
                      <Image
                        source={{
                          uri: `${api}/upload/${e.createUser.profile}`,
                        }}
                        style={{ width: 50, height: 50, borderRadius: 100 }}
                      />
                      <View>
                        <Text>
                          {e.createUser.lastName} {e.createUser.firstName}
                        </Text>
                        <Text style={{ color: "grey" }}>Programmist</Text>
                      </View>
                    </View>
                    <View style={{ marginRight: 20 }}>
                      <Text
                        style={{
                          color: "grey",
                          textAlign: "right",
                        }}
                      >
                        3d
                      </Text>
                    </View>
                  </View>
                )}

                <Image
                  source={{ uri: `${api}/upload/${e.photo}` }}
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
                      <Text style={{ alignSelf: "center" }}> {e.like} </Text>
                    </View>
                  </Pressable>
                  <TouchableOpacity
                    style={{ flexDirection: "row" }}
                    onPress={() =>
                      navigation.navigate("PostDetailScreen", { id: e._id })
                    }
                  >
                    <FontAwesome name="commenting-o" size={24} color="black" />
                    <Text style={{ alignSelf: "center" }}>{e.comment}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{ flexDirection: "row" }}
                    onPress={() =>
                      navigation.navigate("PostDetailScreen", { id: e._id })
                    }
                  >
                    <AntDesign name="sharealt" size={24} color="black" />
                    <Text style={{ alignSelf: "center" }}>{e.share}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        );
      })}
    </ScrollView>
  );
};

export default NetworkingScreen;

const styles = StyleSheet.create({});
