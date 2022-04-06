import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SearchScreen from "../screens/SearchScreen/SearchScreen";
const SearchStack = () => {
  const SearchStack = createNativeStackNavigator();
  return (
    <SearchStack.Navigator>
      <SearchStack.Screen name="SearchScreen" component={SearchScreen} />
    </SearchStack.Navigator>
  );
};

export default SearchStack;

const styles = StyleSheet.create({});
