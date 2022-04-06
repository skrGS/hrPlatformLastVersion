import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NetworkingScreen from "../screens/NetworkingScreen/NetworkingScreen";
import PostDetailScreen from "../screens/NetworkingScreen/PostDetailScreen";
const NetworkingStack = () => {
  const NetworkingStack = createNativeStackNavigator();
  return (
    <NetworkingStack.Navigator>
      <NetworkingStack.Screen
        name="NetworkingScreen"
        component={NetworkingScreen}
      />
      <NetworkingStack.Screen
        name="PostDetailScreen"
        component={PostDetailScreen}
      />
    </NetworkingStack.Navigator>
  );
};

export default NetworkingStack;

const styles = StyleSheet.create({});
