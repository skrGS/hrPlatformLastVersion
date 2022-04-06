import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import axios from "axios";
import { api } from "../../Constants";
import { Alert } from "react-native";
const UserContext = React.createContext();

export const UserStore = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const logout = async () => {
    await AsyncStorage.removeItem("user");
    await axios.get(`${api}/api/v1/cvs/logout`);
    setIsLoggedIn(false);
    setToken(null);
    setEmail(null);
    setPhone(null);
    setUserRole(null);
    setUserId(null);
  };

  const login = (phone, password) => {
    axios
      .post(`${api}/api/v1/cvs/login`, {
        phone: phone,
        password: password,
      })
      .then((result) => {
        // console.log(result.data.cv, "<======== cv");
        loginUserSuccessful(
          result.data.token,
          result.data.cv.email,
          phone,
          result.data.cv.role,
          result.data.cv._id
        );
      })
      .catch((err) => {
        loginFailed(err.message);

        let message = err.message;
        console.log(message);
        if (message === "Request failed with status code 404")
          message = "Утасны дугаар нууц үг хоорондоо таарахгүй байна";
        else if (message === "Network Error")
          message =
            "Сэрвэр ажиллахгүй байна. Та түр хүлээгээд дахин оролдоно уу..";
        else if (message === "Request failed with status code 401")
          message = "Хэрэглэгчийн мэдээлэл буруу байна";

        Alert.alert(message);
      });
  };

  const signUp = (phone, email, password, firstName, lastName) => {
    axios
      .post(`${api}/api/v1/cvs`, {
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        email: email,
        password: password,

        role: "user",
      })
      .then((result) => {
        loginUserSuccessful(
          result.data.token,
          email,
          phone,
          "user",
          firstName,
          lastName
        );
      })
      .catch((err) => {
        loginFailed(err.message);
        let message = err.message;
        if (message === "Request failed with status code 404")
          message = "Утасны дугаар нууц үг хоорондоо таарахгүй байна";
        else if (message === "Network Error")
          message =
            "Сэрвэр ажиллахгүй байна. Та түр хүлээгээд дахин оролдоно уу..";
        else if (message === "Request failed with status code 500")
          message = "Та мэдээлэлээ бүрэн бөглөнө үү";

        Alert.alert(message);
      });
  };

  const loginFailed = (error) => {
    // console.log(error);
    setIsLoggedIn(false);
    setEmail(null);
    setPhone(null);
    setUserRole(null);
    setUserId(null);
  };

  const loginUserSuccessful = async (
    token,
    email,
    phone,
    userRole,
    userId,
    firstName,
    lastName
  ) => {
    setToken(token);
    setEmail(email);
    setPhone(phone);
    setUserRole(userRole);
    setUserId(userId);
    setFirstName(firstName);
    setLastName(lastName);

    setIsLoggedIn(true);
    try {
      await AsyncStorage.setItem(
        "user",
        JSON.stringify({ token, phone, email, userRole, userId })
      );
    } catch (err) {
      console.log("Утас руу хадгалж чадсангүй...");
    }
  };

  return (
    <UserContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        token,
        setToken,
        login,
        userRole,
        phone,
        email,
        signUp,
        logout,
        isLoading,
        setIsLoading,
        setEmail,
        setPhone,
        setUserRole,
        userId,
        setUserId,
        setFirstName,
        firstName,
        setLastName,
        lastName,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
