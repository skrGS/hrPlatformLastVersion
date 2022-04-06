import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EmployerScreen from "../screens/EmployerScreen/EmployerScreen";
import EmployerProfileDetail from "../screens/EmployerScreen/EmployerProfileDetail";
import EmployerWorkDetail from "../screens/EmployerScreen/WorkDetail";
const EmployerStack = () => {
  const EmployerStack = createNativeStackNavigator();
  return (
    <EmployerStack.Navigator>
      <EmployerStack.Screen name="EmployerScreen" component={EmployerScreen} />
      <EmployerStack.Screen
        name="EmployerProfileDetail"
        component={EmployerProfileDetail}
      />
      <EmployerStack.Screen
        name="EmployerWorkDetail"
        component={EmployerWorkDetail}
      />
    </EmployerStack.Navigator>
  );
};

export default EmployerStack;

const styles = StyleSheet.create({});
