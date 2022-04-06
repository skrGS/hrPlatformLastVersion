import { NavigationContainer } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import StackNavigator from "./src/stack/StackNavigator";
import { UserStore } from "./src/context/UserContext";

export default function App() {
  return (
    <NavigationContainer>
      <UserStore>
        <StackNavigator />
      </UserStore>
    </NavigationContainer>
  );
}
