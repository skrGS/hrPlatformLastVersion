import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EmployeeScreen from "../screens/EmployeeScreen/EmployeeScreen";
const EmployeeStack = () => {
  const EmployeeStack = createNativeStackNavigator();
  return (
    <EmployeeStack.Navigator>
      <EmployeeStack.Screen name="EmployeeScreen" component={EmployeeScreen} />
    </EmployeeStack.Navigator>
  );
};

export default EmployeeStack;

const styles = StyleSheet.create({});
