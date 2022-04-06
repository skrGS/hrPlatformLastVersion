import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { api } from "../../../Constants";
const windowWidth = Dimensions.get("window").width;
import moment from "moment";

const EmployerWorkDetail = (props) => {
  const { id } = props.route.params;
  const [workDetail, setWorkDetail] = useState([]);
  const specialWorks = () => {
    axios
      .get(`${api}/api/v1/jobs/${id}`)
      .then((res) => {
        setWorkDetail(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    specialWorks();
  }, []);
  return (
    <>
      {workDetail && (
        <View>
          {workDetail.createUser && (
            <View style={{ flexDirection: "row" }}>
              <Image
                source={{
                  uri: `${api}/upload/${workDetail.createUser.profile}`,
                }}
                style={{ width: 100, height: 100 }}
              />
              <View>
                <Text> Company:{workDetail.createUser.name} </Text>
                <TouchableOpacity
                  style={{
                    backgroundColor: "cyan",
                    borderRadius: 20,
                    padding: 20,
                  }}
                >
                  <Text>Company profile</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          {workDetail.occupation && (
            <View>
              <Text> {workDetail.occupation.name} </Text>
            </View>
          )}
          <Text> {workDetail.salary} </Text>
          <Text> {workDetail.type} </Text>
        </View>
      )}
    </>
  );
};

export default EmployerWorkDetail;

const styles = StyleSheet.create({});
