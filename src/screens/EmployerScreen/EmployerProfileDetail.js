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

const EmployerProfileDetail = (props) => {
  const { id } = props.route.params;
  const [data, setData] = useState();
  const [jobs, setJobs] = useState([]);
  const CompanyDetail = () => {
    axios
      .get(`${api}/api/v1/profiles/${id}`)
      .then((res) => {
        setData(res.data.data);
        setJobs(res.data.data.job);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    CompanyDetail();
  }, []);
  return (
    <ScrollView>
      {console.log(jobs)}
      {data && (
        <View>
          <Image
            source={{ uri: `${api}/upload/${data.cover}` }}
            style={{
              width: windowWidth,
              height: 200,
              backgroundColor: "black",
            }}
          />
          <Image
            source={{ uri: `${api}/upload/${data.profile}` }}
            style={{
              width: 130,
              height: 130,
              borderRadius: 50,
              bottom: 60,
              alignSelf: "center",
            }}
          />
          <View style={{ marginHorizontal: 20 }}>
            {/* Ner hayag */}
            <View style={{ bottom: 40 }}>
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: 20,
                }}
              >
                {data.name}
              </Text>
              <Text style={{ textAlign: "center", color: "grey" }}>
                {data.location}
              </Text>
            </View>
            {/* Follower status */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                bottom: 25,
              }}
            >
              <View>
                <Text style={styles.networkingStatus}>Ажлын байр</Text>
                <Text style={styles.networkingStatusNumber}>110</Text>
              </View>
              <View style={{ borderLeftWidth: 1 }} />
              <View>
                <Text style={styles.networkingStatus}>Дагагчид</Text>
                <Text style={styles.networkingStatusNumber}>110</Text>
              </View>
              <View style={{ borderLeftWidth: 1 }} />
              <View>
                <Text style={styles.networkingStatus}>Дагагч</Text>
                <Text style={styles.networkingStatusNumber}>110</Text>
              </View>
            </View>
            {/* dagah button, holboo barih */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: "#00FFFF",
                  borderRadius: 20,
                  padding: 10,
                  paddingHorizontal: 20,
                }}
              >
                <Text style={{ fontWeight: "bold" }}>Дагах</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: "#00FFFF",
                  borderRadius: 20,
                  padding: 10,
                  paddingHorizontal: 20,
                }}
              >
                <Text style={{ fontWeight: "bold" }}>Компани тодорхой</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: "#00FFFF",
                  borderRadius: 20,
                  padding: 10,
                }}
              >
                <Text style={{ fontWeight: "bold" }}>Холбоо барих</Text>
              </TouchableOpacity>
            </View>
          </View>
          {jobs.map((e, index) => {
            return (
              <View key={index}>
                <Text>{e.occupation && e.occupation.name}</Text>
                <Text> {e.do} </Text>
                <Text> {e.description} </Text>
                <Text>
                  {" "}
                  {moment(e.createdAt).format("YYYYонMMсарDD, hh:mm:ss a")}{" "}
                </Text>
              </View>
            );
          })}
        </View>
      )}
    </ScrollView>
  );
};

export default EmployerProfileDetail;

const styles = StyleSheet.create({
  networkingStatus: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  networkingStatusNumber: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});
