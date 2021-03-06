import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import MyTextInput from "../../components/MyTextInput";
import { AntDesign } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import UserContext from "../../context/UserContext";

const LoginScreen = () => {
  const navigation = useNavigation();
  const state = useContext(UserContext);
  const [phone, setPhone] = useState("95841080");
  const [password, setPassword] = useState("123456");

  const signUpHandler = () => {
    state.login(phone, password);
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView style={{ flex: 1 }}>
        <AntDesign
          name="arrowleft"
          size={30}
          color="#ffffff"
          style={{
            position: "absolute",
            top: 50,
            left: 10,
            zIndex: 2,
          }}
          onPress={() => navigation.goBack()}
        />
        <ImageBackground
          source={require("../../../assets/ihelp/personhead.png")}
          style={{ flex: 1, height: 220 }}
          resizeMode="cover"
        >
          <Animatable.Image
            animation="pulse"
            iterationCount="infinite"
            direction="alternate"
            easing="ease-out"
            source={require("../../../assets/ihelp/logo.png")}
            style={{ width: 250, height: 90, alignSelf: "center", top: 65 }}
          />
          <View
            style={{
              backgroundColor: "white",
              top: 80,
              marginHorizontal: 100,
              borderRadius: 50,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 5,
              },
              shadowOpacity: 0.34,
              shadowRadius: 6.27,
              elevation: 10,
              padding: 6,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 25,
                color: "#765097",
              }}
            >
              Person
            </Text>
          </View>
        </ImageBackground>

        <View style={{ top: 10, flex: 1 }}>
          <View>
            <Text style={styles.inputHeadText}>???????????? ????????????:</Text>
            <MyTextInput value={phone} onChangeText={setPhone} />

            <Text style={styles.inputHeadText}>???????? ????:</Text>
            <MyTextInput
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
            />
          </View>
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              style={{ flex: 1, top: 5 }}
              onPress={signUpHandler}
            >
              <ImageBackground
                source={require("../../../assets/ihelp/personbutton.png")}
                style={{ height: 100 }}
              >
                <Text
                  style={{
                    top: 45,
                    fontSize: 18,
                    color: "white",
                    textAlign: "center",
                  }}
                >
                  ??????????????
                </Text>
              </ImageBackground>
            </TouchableOpacity>
            <Text
              style={{
                textAlign: "center",
                fontSize: 15,
                position: "absolute",
                top: 100,
                alignSelf: "center",
              }}
            >
              ???????????????????? ??????{" "}
              <Text
                style={{ color: "#765097" }}
                onPress={() => navigation.navigate("SignUpScreen")}
              >
                ?????? ??????
              </Text>{" "}
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  inputHeadText: {
    fontSize: 15,
    paddingLeft: 35,
    paddingTop: 10,
    paddingBottom: 5,
    color: "#765097",
    fontWeight: "600",
  },
  textPrimary: {
    marginVertical: 20,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  textSecondary: {
    marginBottom: 10,
    textAlign: "center",
    fontSize: 17,
    color: "grey",
    fontWeight: "bold",
  },
});
