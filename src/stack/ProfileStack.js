import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CompanyDetailScreen from "../screens/ProfileScreen/CompanyDetailScreen";
import ProfileScreen from "../screens/ProfileScreen/ProfileScreen";
import EditProfileScreen from "../screens/ProfileScreen/EditProfileScreen";
import EditPersonalDetailScreen from "../screens/ProfileScreen/EditPersonalDetailScreen";
import EditWorkDetailScreen from "../screens/ProfileScreen/Expression/EditWorkDetailScreen";
import AddWorkScreen from "../screens/ProfileScreen/Expression/AddWorkScreen";
import EditWorkScreen from "../screens/ProfileScreen/Expression/EditWorkScreen";
import EditEducationDetailScreen from "../screens/ProfileScreen/Education/EditEducationDetailScreen";
import EditEducationScreen from "../screens/ProfileScreen/Education/EditEducationScreen";
import AddEducationScreen from "../screens/ProfileScreen/Education/AddEducationScreen";
import AddPortfolia from "../screens/ProfileScreen/AddPortfolia";
const ProfileStack = () => {
  const ProfileStack = createNativeStackNavigator();
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="ProfileScreen" component={ProfileScreen} />
      <ProfileStack.Screen
        name="EditProfileScreen"
        component={EditProfileScreen}
      />
      <ProfileStack.Screen
        name="EditPersonalDetailScreen"
        component={EditPersonalDetailScreen}
      />
      <ProfileStack.Screen
        name="CompanyDetailScreen"
        component={CompanyDetailScreen}
        // options={{ headerShown: false }}
      />
      <ProfileStack.Screen
        name="EditWorkDetailScreen"
        component={EditWorkDetailScreen}
        // options={{ headerShown: false }}
      />
      <ProfileStack.Screen
        name="AddWorkScreen"
        component={AddWorkScreen}
        // options={{ headerShown: false }}
      />
      <ProfileStack.Screen
        name="EditWorkScreen"
        component={EditWorkScreen}
        // options={{ headerShown: false }}
      />
      <ProfileStack.Screen
        name="EditEducationDetailScreen"
        component={EditEducationDetailScreen}
        // options={{ headerShown: false }}
      />
      <ProfileStack.Screen
        name="AddEducationScreen"
        component={AddEducationScreen}
        // options={{ headerShown: false }}
      />
      <ProfileStack.Screen
        name="EditEducationScreen"
        component={EditEducationScreen}
        // options={{ headerShown: false }}
      />
      <ProfileStack.Screen
        name="AddPortfolia"
        component={AddPortfolia}
        // options={{ headerShown: false }}
      />
    </ProfileStack.Navigator>
  );
};

export default ProfileStack;

const styles = StyleSheet.create({});
