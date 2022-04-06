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
const TestCompany = () => {
  const navigation = useNavigation();
  const [company, setCompany] = useState([]);
  const companys = () => {
    axios
      .get(`${api}/api/v1/profiles/unspecials/employer`)
      .then((res) => {
        console.log(res.data.data, "Engiin Company");
        setCompany(res.data.data);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    companys();
  }, []);
  return (
    <>
      <Text>Company</Text>
      {company.map((item, index) => {
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
                <View>
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

export default TestCompany;

const styles = StyleSheet.create({});
