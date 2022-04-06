import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

import { useNavigation } from "@react-navigation/native";
import moment from "moment";

const EditWorkDetailScreen = (props) => {
  const { data } = props.route.params;
  const navigation = useNavigation();

  return (
    <View>
      {data.map((e, index) => {
        return (
          <View key={index} style={{ marginTop: 20, marginHorizontal: 20 }}>
            <TouchableOpacity
              onPress={() => navigation.navigate("EditWorkScreen", { data: e })}
            >
              <Text> {e.company} </Text>
              <View style={{ borderWidth: 1 }} />
            </TouchableOpacity>
          </View>
        );
      })}
      <Text
        style={{
          textAlign: "center",
          backgroundColor: "green",
          alignSelf: "center",
          padding: 10,
        }}
        onPress={() => navigation.navigate("AddWorkScreen")}
      >
        Нэмэх
      </Text>
    </View>
  );
};

export default EditWorkDetailScreen;

const styles = StyleSheet.create({});
