import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Modal,
  Alert,
  Pressable,
  Switch,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import { api } from "../../../../Constants";
import Moment from "moment";
const EditEducationScreen = (props) => {
  const { data } = props.route.params;
  const [selectedYear, setSelectedYear] = useState();
  const [selectedMonth, setSelectedMonth] = useState();
  const [modalYear, setModalYear] = useState(false);
  const [modalMonth, setModalMonth] = useState(false);
  const [selectedEndYear, setSelectedEndYear] = useState(12);
  const [selectedEndMonth, setSelectedEndMonth] = useState(12);
  const [modalEndYear, setModalEndYear] = useState(false);
  const [modalEndMonth, setModalEndMonth] = useState(false);
  const [school, setSchool] = useState(data.school);
  const [field, setField] = useState(data.field);
  const [grade, setGrade] = useState(data.grade);
  const [description, setDescription] = useState(data.description);
  // const [location, setLocation] = useState(data.location);
  const sendCompanyDetail = () => {
    axios
      .put(`${api}/api/v1/courses/${data._id}`, {
        school: school,
        field: field,
        grade: grade,
        description: description,
        start: `${selectedYear}-${selectedMonth}`,
        end: `${selectedEndYear}-${selectedEndMonth}`,
        isStudying: isEnabled,
        // location: location,
      })
      .then((res) => console.log(res.data.data))
      .catch((err) => console.log(err));
  };
  const deleteCompanyDetail = () => {
    axios
      .delete(`${api}/api/v1/courses/${data._id}`)
      .then((res) => console.log(res.data.data))
      .catch((err) => console.log(err));
  };
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  return (
    <View style={{ flex: 1 }}>
      {/* Input details */}
      <View>
        <Text>Surguuliin ner </Text>
        <TextInput
          placeholder="Company ner"
          style={{ borderWidth: 1, padding: 5 }}
          value={school}
          onChangeText={setSchool}
        />
        <Text>field</Text>
        <TextInput
          placeholder="occupation"
          style={{ borderWidth: 1, padding: 5 }}
          value={field}
          onChangeText={setField}
        />
        <Text>grade</Text>
        <TextInput
          placeholder="position"
          style={{ borderWidth: 1, padding: 5 }}
          value={grade}
          onChangeText={setGrade}
        />
        {/*        
        <Text>??????????????</Text>
        <TextInput
          placeholder="??????????????"
          style={{ borderWidth: 1, padding: 5 }}
          value={location}
          onChangeText={setLocation}
        /> */}
        <Text>??????????????</Text>
        <TextInput
          placeholder="??????????????"
          style={{ borderWidth: 1, padding: 5 }}
          value={description}
          onChangeText={setDescription}
        />
      </View>

      <Text> Surguulid ?????????? ??????????: </Text>
      <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
        {selectedYear ? (
          <Text style={{ fontSize: 20 }} onPress={() => setModalYear(true)}>
            {selectedYear}
          </Text>
        ) : (
          <Text style={{ fontSize: 20 }} onPress={() => setModalYear(true)}>
            ??????
          </Text>
        )}
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalYear}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalYear(!modalYear);
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
              <Text style={styles.modalText}>surguulid ?????????? ??????</Text>
              <Picker
                selectedValue={selectedYear}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedYear(itemValue)
                }
                style={{ width: 200, height: 200 }}
              >
                <Picker.Item label="2000????" value="2000" />
                <Picker.Item label="2001????" value="2001" />
                <Picker.Item label="2002????" value="2002" />
                <Picker.Item label="2003????" value="2003" />
                <Picker.Item label="2004????" value="2004" />
                <Picker.Item label="2005????" value="2005" />
                <Picker.Item label="2006????" value="2006" />
                <Picker.Item label="2007????" value="2007" />
                <Picker.Item label="2008????" value="2008" />
                <Picker.Item label="2009????" value="2009" />
                <Picker.Item label="2010????" value="2010" />
                <Picker.Item label="2011????" value="2011" />
                <Picker.Item label="2012????" value="2012" />
                <Picker.Item label="2013????" value="2013" />
                <Picker.Item label="2014????" value="2014" />
                <Picker.Item label="2015????" value="2015" />
                <Picker.Item label="2016????" value="2016" />
                <Picker.Item label="2017????" value="2017" />
                <Picker.Item label="2018????" value="2018" />
                <Picker.Item label="2019????" value="2019" />
                <Picker.Item label="2020????" value="2020" />
                <Picker.Item label="2021????" value="2021" />
                <Picker.Item label="2022????" value="2022" />
                <Picker.Item label="2023????" value="2023" />
              </Picker>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalYear(!modalYear)}
              >
                <Text style={styles.textStyle}>????????????</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        {selectedMonth ? (
          <Text style={{ fontSize: 20 }}> {selectedMonth} </Text>
        ) : (
          <Text style={{ fontSize: 20 }} onPress={() => setModalMonth(true)}>
            ??????
          </Text>
        )}
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalMonth}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalMonth(!modalMonth);
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
              <Text style={styles.modalText}>surguulid ?????????? ??????</Text>
              <Picker
                selectedValue={selectedMonth}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedMonth(itemValue)
                }
                style={{ width: 200, height: 200 }}
              >
                <Picker.Item label="1??????" value="1" />
                <Picker.Item label="2??????" value="2" />
                <Picker.Item label="3??????" value="3" />
                <Picker.Item label="4??????" value="4" />
                <Picker.Item label="5??????" value="5" />
                <Picker.Item label="6??????" value="6" />
                <Picker.Item label="7??????" value="7" />
                <Picker.Item label="8??????" value="8" />
                <Picker.Item label="9??????" value="9" />
                <Picker.Item label="10??????" value="10" />
                <Picker.Item label="11??????" value="11" />
                <Picker.Item label="12??????" value="12" />
              </Picker>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalMonth(!modalMonth)}
              >
                <Text style={styles.textStyle}>????????????</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
      <Text> ???????? surj ???????????? ????????? </Text>
      <View style={{ flexDirection: "row" }}>
        <Text> Surj ????????????? </Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
        <Text> Suraas garsan </Text>
      </View>
      {!isEnabled ? (
        <>
          <Text> Suraas ???????????? ??????????: </Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-evenly" }}
          >
            {selectedEndYear ? (
              <Text
                style={{ fontSize: 20 }}
                onPress={() => setModalEndYear(true)}
              >
                {selectedEndYear}
              </Text>
            ) : (
              <Text
                style={{ fontSize: 20 }}
                onPress={() => setModalEndYear(true)}
              >
                ??????
              </Text>
            )}
            <Modal
              animationType="fade"
              transparent={true}
              visible={modalEndYear}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalEndYear(!modalEndYear);
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
                  <Text style={styles.modalText}>Suraas ?????????? ??????</Text>
                  <Picker
                    selectedValue={selectedEndYear}
                    onValueChange={(itemValue, itemIndex) =>
                      setSelectedEndYear(itemValue)
                    }
                    style={{ width: 200, height: 200 }}
                  >
                    <Picker.Item label="2000????" value="2000" />
                    <Picker.Item label="2001????" value="2001" />
                    <Picker.Item label="2002????" value="2002" />
                    <Picker.Item label="2003????" value="2003" />
                    <Picker.Item label="2004????" value="2004" />
                    <Picker.Item label="2005????" value="2005" />
                    <Picker.Item label="2006????" value="2006" />
                    <Picker.Item label="2007????" value="2007" />
                    <Picker.Item label="2008????" value="2008" />
                    <Picker.Item label="2009????" value="2009" />
                    <Picker.Item label="2010????" value="2010" />
                    <Picker.Item label="2011????" value="2011" />
                    <Picker.Item label="2012????" value="2012" />
                    <Picker.Item label="2013????" value="2013" />
                    <Picker.Item label="2014????" value="2014" />
                    <Picker.Item label="2015????" value="2015" />
                    <Picker.Item label="2016????" value="2016" />
                    <Picker.Item label="2017????" value="2017" />
                    <Picker.Item label="2018????" value="2018" />
                    <Picker.Item label="2019????" value="2019" />
                    <Picker.Item label="2020????" value="2020" />
                    <Picker.Item label="2021????" value="2021" />
                    <Picker.Item label="2022????" value="2022" />
                    <Picker.Item label="2023????" value="2023" />
                  </Picker>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalEndYear(!modalEndYear)}
                  >
                    <Text style={styles.textStyle}>????????????</Text>
                  </Pressable>
                </View>
              </View>
            </Modal>
            {selectedEndMonth ? (
              <Text style={{ fontSize: 20 }}> {selectedEndMonth} </Text>
            ) : (
              <Text
                style={{ fontSize: 20 }}
                onPress={() => setModalEndMonth(true)}
              >
                ??????
              </Text>
            )}
            <Modal
              animationType="fade"
              transparent={true}
              visible={modalEndMonth}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalEndMonth(!modalEndMonth);
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
                  <Text style={styles.modalText}>?????????? ?????????? ??????</Text>
                  <Picker
                    selectedValue={selectedEndMonth}
                    onValueChange={(itemValue, itemIndex) =>
                      setSelectedEndMonth(itemValue)
                    }
                    style={{ width: 200, height: 200 }}
                  >
                    <Picker.Item label="1??????" value="1" />
                    <Picker.Item label="2??????" value="2" />
                    <Picker.Item label="3??????" value="3" />
                    <Picker.Item label="4??????" value="4" />
                    <Picker.Item label="5??????" value="5" />
                    <Picker.Item label="6??????" value="6" />
                    <Picker.Item label="7??????" value="7" />
                    <Picker.Item label="8??????" value="8" />
                    <Picker.Item label="9??????" value="9" />
                    <Picker.Item label="10??????" value="10" />
                    <Picker.Item label="11??????" value="11" />
                    <Picker.Item label="12??????" value="12" />
                  </Picker>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalEndMonth(!modalEndMonth)}
                  >
                    <Text style={styles.textStyle}>????????????</Text>
                  </Pressable>
                </View>
              </View>
            </Modal>
          </View>
        </>
      ) : (
        <Text>Surj ????????????</Text>
      )}
      <Text
        style={{
          backgroundColor: "cyan",
          padding: 10,
          textAlign: "center",
          marginHorizontal: 20,
        }}
        onPress={sendCompanyDetail}
      >
        ????????????
      </Text>
      <Text
        style={{
          backgroundColor: "red",
          padding: 10,
          textAlign: "center",
          marginHorizontal: 20,
        }}
        onPress={deleteCompanyDetail}
      >
        ????????????
      </Text>
    </View>
  );
};

export default EditEducationScreen;

const styles = StyleSheet.create({
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
