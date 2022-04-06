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
const SpecialCompany = () => {
  const navigation = useNavigation();
  const [specCompany, setSpecCompany] = useState([]);
  const specialCompanys = () => {
    axios
      .get(`${api}/api/v1/profiles/specials/employer?limit=100`)
      .then((res) => {
        console.log(res.data.data);
        setSpecCompany(res.data.data);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    specialCompanys();
  }, []);
  return (
    <>
      <Text>oncloh company</Text>
      {specCompany.map((item, index) => {
        return (
          <View key={index}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("EmployerProfileDetail", { id: item._id })
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
                  source={{ uri: `${api}/upload/${item.profile}` }}
                  style={{ width: 80, height: 80 }}
                  resizeMode="contain"
                />
                <View style={{ flex: 0.9 }}>
                  <Text style={{ fontWeight: "bold" }}>{item.name} </Text>
                  <Text>{item.about.substring(0, 100)}.... </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        );
      })}
    </>
  );
};

export default SpecialCompany;

const styles = StyleSheet.create({});
