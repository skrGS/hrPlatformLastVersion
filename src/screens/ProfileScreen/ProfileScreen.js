import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Modal,
  Alert,
  Pressable,
  TextInput,
} from "react-native";
import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { api } from "../../../Constants";
import axios from "axios";
import UserContext from "../../context/UserContext";
const windowWidth = Dimensions.get("window").width;
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
const ProfileScreen = () => {
  const state = useContext(UserContext);
  const [data, setData] = useState([]);
  const [posts, setPosts] = useState([]);
  const [experience, setExperience] = useState([]);
  const [study, setStudy] = useState([]);
  const [portfolio, setPorfolio] = useState([]);
  const UserData = () => {
    axios
      .get(`${api}/api/v1/cvs/${state.userId}`)
      .then((e) => {
        setData(e.data.data);
        setPosts(e.data.data.post);
        setExperience(e.data.data.experience);
        setPorfolio(e.data.data.portfolio);
        setStudy(e.data.data.course);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [userProfession, setUserProfession] = useState();
  const ChangeUserData = () => {
    axios
      .put(`${api}/api/v1/cvs/${state.userId}`, { profession: userProfession })
      .then((res) => {
        // console.log(res.data.data);
        // modalVisible(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    UserData();
  }, []);
  // ref
  const bottomSheetModalRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ["90%"], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);
  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        {...props}
      />
    ),
    []
  );
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <BottomSheetModalProvider>
      <ScrollView style={{ flex: 1 }}>
        {/* cover */}
        <Image
          source={{ uri: `${api}/upload/${data.cover}` }}
          style={{ width: windowWidth, height: 200 }}
        />
        {/* Propic */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text>a</Text>
          <Image
            source={{ uri: `${api}/upload/${data.profile}` }}
            style={{
              width: 130,
              height: 130,
              borderRadius: 50,
              bottom: 60,
            }}
          />
          <MaterialCommunityIcons
            name="dots-horizontal"
            size={40}
            color="black"
            onPress={handlePresentModalPress}
          />
          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={0}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
            backdropComponent={renderBackdrop}
          >
            <View style={{ marginHorizontal: 20 }}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("EditProfileScreen", {
                    data: data,
                    experience: experience,
                    study: study,
                  })
                }
              >
                <Text style={{ fontSize: 20 }}>EditProfile</Text>
                <View style={{ borderWidth: 1 }} />
              </TouchableOpacity>
            </View>
          </BottomSheetModal>
        </View>
        {/* Нэр Ажлын статус Хот */}
        <View style={{ marginHorizontal: 20 }}>
          <View style={{ bottom: 50 }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              {data.firstName} {data.lastName}
            </Text>
            {/* Working Status */}
            {data.workingCompany === null ? (
              <Text
                style={{
                  textAlign: "center",
                  color: "grey",
                  fontSize: 18,
                }}
              >
                Ajilgui
              </Text>
            ) : (
              <Text
                style={{ textAlign: "center", color: "grey", fontSize: 18 }}
              >
                {data.workingCompany}
              </Text>
            )}
            {/* Location */}
            {data.location === null ? (
              <Text
                style={{
                  textAlign: "center",
                  color: "grey",
                  fontSize: 18,
                }}
              >
                Хоосон
              </Text>
            ) : (
              <Text
                style={{ textAlign: "center", color: "grey", fontSize: 18 }}
              >
                {data.location}
              </Text>
            )}
          </View>
          {/* Follow and posts */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              bottom: 25,
            }}
          >
            <View>
              <Text style={styles.networkingStatus}>Posts</Text>
              <Text style={styles.networkingStatusNumber}>110</Text>
            </View>
            <View style={{ borderLeftWidth: 1 }} />
            <View>
              <Text style={styles.networkingStatus}>Followers</Text>
              <Text style={styles.networkingStatusNumber}>110</Text>
            </View>
            <View style={{ borderLeftWidth: 1 }} />
            <View>
              <Text style={styles.networkingStatus}>Following</Text>
              <Text style={styles.networkingStatusNumber}>110</Text>
            </View>
          </View>
          {/* mergejil */}
          <Text onPress={() => setModalVisible(true)}>Мэргэжил</Text>
          {data.profession === undefined ? (
            <>
              <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                  Alert.alert("Modal has been closed.");
                  setModalVisible(!modalVisible);
                }}
              >
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    backgroundColor: "rgba(0,0,0,0.5)",
                  }}
                >
                  <View style={styles.modalView}>
                    <Text style={styles.modalText}>Мэргэжил солих</Text>
                    <TextInput
                      style={{
                        borderWidth: 1,
                        padding: 10,
                        paddingHorizontal: 30,
                      }}
                      placeholder="Mergejil"
                      value={userProfession}
                      onChangeText={setUserProfession}
                    />
                    <Pressable
                      style={[styles.button, styles.buttonClose]}
                      onPress={ChangeUserData}
                    >
                      <Text style={styles.textStyle}>Nemeh</Text>
                    </Pressable>
                    <Pressable
                      style={[styles.button, styles.buttonClose]}
                      onPress={() => setModalVisible(!modalVisible)}
                    >
                      <Text style={styles.textStyle}>Hide Modal</Text>
                    </Pressable>
                  </View>
                </View>
              </Modal>
              <Text
                style={{ fontSize: 30 }}
                onPress={() => setModalVisible(true)}
              >
                Нэмэх
              </Text>
            </>
          ) : (
            <Text style={{ fontSize: 30 }}>{data.profession}</Text>
          )}

          {/* turshilaga */}
          <Text>Ажлын туршлага</Text>
          {experience.length === 0 ? (
            <Text style={{ fontSize: 30 }}> Нэмэх </Text>
          ) : (
            <>
              {experience.map((e, index) => {
                return (
                  <View key={index} style={{ backgroundColor: "grey" }}>
                    <Text> {e.company} </Text>
                    <Text> {e.occupation} </Text>
                    <Text> {e.position} </Text>
                    <Text> {e.type} </Text>
                    <Text> {e.location} </Text>
                    <Text> {e.description} </Text>
                    <Text>
                      Ажилласан: {moment(e.start).format("YYYYонMMсарDD")}{" "}
                    </Text>
                    {e.isWorking === true ? (
                      <Text style={{ color: "green" }}> Ajillaj bgaa </Text>
                    ) : (
                      <Text>
                        Ажиллаас гарсан:{" "}
                        {moment(e.end).format("YYYYон MMсар DD")}
                      </Text>
                    )}
                  </View>
                );
              })}
            </>
          )}

          {/* Bolovsrol */}
          <Text>Education</Text>
          {study.length === 0 ? (
            <Text style={{ fontSize: 30 }}> Нэмэх </Text>
          ) : (
            <>
              {study.map((e, index) => {
                return (
                  <View key={index}>
                    <Text> {e.school} </Text>
                    <Text> {e.field} </Text>
                    <Text> {moment(e.start).format("YYYYонMMсарDD")} </Text>
                    {e.isStudying === true ? (
                      <Text style={{ color: "green" }}> Surj bgaa </Text>
                    ) : (
                      <Text>
                        Suraas гарсан: {moment(e.end).format("YYYYон MMсар DD")}
                      </Text>
                    )}
                    <Text> {e.description} </Text>
                  </View>
                );
              })}
            </>
          )}

          {/* Portf */}
          {/* Networking activity */}
        </View>
      </ScrollView>
    </BottomSheetModalProvider>
  );
};

export default ProfileScreen;

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
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
