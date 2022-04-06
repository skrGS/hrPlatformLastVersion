import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { api } from "../../../Constants";
import { useNavigation } from "@react-navigation/native";
const windowWidth = Dimensions.get("window").width;
import moment from "moment";
const Work = () => {
  const navigation = useNavigation();
  const [specialWork, setSpecialWork] = useState([]);
  const specialWorks = () => {
    axios
      .get(`${api}/api/v1/jobs/specials?sort=-createdAt`)
      .then((res) => {
        setSpecialWork(res.data.data, "Ontsloh ajliin zar");
        console.log(res.data.data);
      })
      .catch((err) => console.log(err));
  };
  const [urgentWork, setUrgentWork] = useState([]);
  const urgentWorks = () => {
    axios
      .get(`${api}/api/v1/jobs/specials?sort=-createdAt`)
      .then((res) => {
        setUrgentWork(res.data.data, "yaaraltai ajliin zar");
        console.log(res.data.data);
      })
      .catch((err) => console.log(err));
  };
  const [normalWork, setNormalWork] = useState([]);
  const normalWorks = () => {
    axios
      .get(`${api}/api/v1/jobs/unspecials?sort=-createdAt`)
      .then((res) => {
        setNormalWork(res.data.data);
        console.log(res.data.data, "engiin zar");
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    specialWorks();
    urgentWorks();
    normalWorks();
  }, []);
  return (
    <>
      {/* yaaraltai */}
      <Text>yaaraltai</Text>
      {urgentWork.map((item, index) => {
        return (
          <View key={index}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("EmployerWorkDetail", { id: item._id })
              }
            >
              <View
                style={{
                  flexDirection: "row",
                  width: windowWidth,
                  backgroundColor: "white",
                  marginVertical: 5,
                }}
              >
                <Image
                  source={{
                    uri: `${api}/upload/${
                      item.createUser && item.createUser.profile
                    }`,
                  }}
                  style={{ width: 80, height: 80 }}
                  resizeMode="contain"
                />
                <View style={{ flex: 0.9 }}>
                  <Text style={{ fontWeight: "bold" }}>
                    {item.createUser && item.createUser.name}{" "}
                  </Text>
                  <Text style={{ fontWeight: "bold" }}>
                    {item.occupation && item.occupation.name}1
                  </Text>
                  <Text style={{ fontWeight: "bold" }}>{item.do} </Text>
                  <Text style={{ fontWeight: "bold" }}>
                    {moment(item.createdAt).format("YYYYонMMсарDD, hh:mm:ss a")}{" "}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        );
      })}
      {/* ontsloh */}
      <Text>Ontsloh</Text>
      {specialWork.map((item, index) => {
        return (
          <View key={index}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("EmployerWorkDetail", { id: item._id })
              }
            >
              <View
                style={{
                  flexDirection: "row",
                  width: windowWidth,
                  backgroundColor: "white",
                  marginVertical: 5,
                }}
              >
                <Image
                  source={{
                    uri: `${api}/upload/${
                      item.createUser && item.createUser.profile
                    }`,
                  }}
                  style={{ width: 80, height: 80 }}
                  resizeMode="contain"
                />
                <View style={{ flex: 0.9 }}>
                  <Text style={{ fontWeight: "bold" }}>
                    {item.createUser && item.createUser.name}{" "}
                  </Text>
                  <Text style={{ fontWeight: "bold" }}>
                    {item.occupation && item.occupation.name}1
                  </Text>
                  <Text style={{ fontWeight: "bold" }}>{item.do} </Text>
                  <Text style={{ fontWeight: "bold" }}>
                    {moment(item.createdAt).format("YYYYонMMсарDD, hh:mm:ss a")}{" "}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        );
      })}
      {/* Tolborgui */}
      <Text>yaduu</Text>
      {normalWork.map((item, index) => {
        return (
          <View style={{ flex: 1 }} key={index}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("EmployerWorkDetail", { id: item._id })
              }
            >
              <View
                style={{
                  flexDirection: "row",
                  width: windowWidth,
                  backgroundColor: "white",
                  marginVertical: 5,
                }}
              >
                <Image
                  source={{
                    uri: `${api}/upload/${
                      item.createUser && item.createUser.profile
                    }`,
                  }}
                  style={{ width: 80, height: 80 }}
                  resizeMode="contain"
                />
                <View style={{ flex: 0.9 }}>
                  <Text style={{ fontWeight: "bold" }}>
                    {item.createUser && item.createUser.name}{" "}
                  </Text>
                  <Text style={{ fontWeight: "bold" }}>
                    {item.occupation && item.occupation.name}1
                  </Text>
                  <Text style={{ fontWeight: "bold" }}>{item.do} </Text>
                  <Text style={{ fontWeight: "bold" }}>
                    {moment(item.createdAt).format("YYYYонMMсарDD, hh:mm:ss a")}{" "}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        );
      })}
    </>
  );
};

export default Work;

const styles = StyleSheet.create({});
