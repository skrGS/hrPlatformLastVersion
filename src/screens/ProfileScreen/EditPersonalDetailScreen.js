import { StyleSheet, Text, View, ScrollView, Button } from "react-native";
import React, { useState } from "react";
import FormText from "../../components/FormText";
import { api } from "../../../Constants";
import axios from "axios";
const EditPersonalDetailScreen = (props) => {
  const { data } = props.route.params;
  const [profileData, setProfileData] = useState({
    lastName: data.lastName,
    firstName: data.firstName,
    phone: data.phone,
    email: data.email,
    humanId: data.humanId,
  });

  const editProfile = () => {
    axios
      .put(`${api}/api/v1/cvs/${data._id}`, profileData)
      .then((result) => {
        // console.log(result.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [error, setError] = useState({
    lastName: false,
    firstName: false,
    phone: false,
    email: false,
    humanId: false,
  });

  const checkLastName = (text) => {
    setError({
      ...error,
      lastName: text.length < 5 || text.length > 20,
    });

    setProfileData({
      ...profileData,
      lastName: text,
    });
  };
  const checkFirstName = (text) => {
    setError({
      ...error,
      firstName: text.length < 5 || text.length > 20,
    });

    setProfileData({
      ...profileData,
      firstName: text,
    });
  };
  const checkPhone = (text) => {
    setError({
      ...error,
      phone: text.length < 5 || text.length > 20,
    });

    setProfileData({
      ...profileData,
      phone: text,
    });
  };
  const checkEmail = (text) => {
    setError({
      ...error,
      email: text.length < 5 || text.length > 20,
    });

    setProfileData({
      ...profileData,
      email: text,
    });
  };
  //   const checkHumanId = (text) => {
  //     setError({
  //       ...error,
  //       humanId: text.length < 5 || text.length > 20,
  //     });

  //     setProfileData({
  //       ...profileData,
  //       humanId: text,
  //     });
  //   };

  return (
    <View>
      <Text>{data.firstName}</Text>

      <ScrollView>
        <FormText
          label="Овог нэрийг оруулна уу"
          placeholder="Номын нэр"
          icon="book-open"
          value={profileData.lastName}
          onChangeText={checkLastName}
          errorShow={error.lastName}
          errorText="Овог нэрийн урт 4-20 тэмдэгтээс тогтоно."
        />

        <FormText
          label="Нэр оруулна уу"
          placeholder=" нэр"
          icon="user"
          value={profileData.firstName}
          onChangeText={checkFirstName}
          errorShow={error.firstName}
          errorText=" нэрийн урт 5 - 15 үсгээс тогтоно."
        />

        <FormText
          label="Утасны дугаар оруулна уу"
          placeholder="Утасны дугаар"
          icon="dollar-sign"
          value={profileData.email}
          onChangeText={checkEmail}
          errorShow={error.email}
          errorText="Утасны дугаар 6оронтой байна."
        />

        {/* <FormText
          label="Регистерийн дугаар оруулна уу"
          placeholder="Регистерийн дугаар"
          icon="edit"
          value={profileData.humanId}
          onChangeText={checkHumanId}
          errorShow={error.humanId}
          errorText="Регистерийн дугаар 10 - 1000 тэмдэгтээс тогтоно."
        /> */}

        <Button title="Бүртгэх" onPress={editProfile} />
      </ScrollView>
    </View>
  );
};

export default EditPersonalDetailScreen;

const styles = StyleSheet.create({});
