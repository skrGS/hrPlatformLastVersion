import {
  StyleSheet,
  Text,
  Dimensions,
  ScrollView,
  Switch,
  View,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import SpecialCompany from "./SpecialCompany";
import Company from "./Company";
import Work from "./Work";
import TestCompany from "./TestCompany";
const windowWidth = Dimensions.get("window").width;
const EmployerScreen = () => {
  const navigation = useNavigation();
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  return (
    <View>
      <View style={{ flexDirection: "row" }}>
        <Text> Ajliin bairaar </Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
        <Text> Company gaar </Text>
      </View>

      {isEnabled === true ? (
        <View>
          <Text>Онцлох байгууллага</Text>
          <SpecialCompany />
          <Text>Ядуу байгууллага</Text>
          <Company />
        </View>
      ) : (
        <View>
          <Work />
        </View>
      )}
    </View>
  );
};

export default EmployerScreen;

const styles = StyleSheet.create({});
