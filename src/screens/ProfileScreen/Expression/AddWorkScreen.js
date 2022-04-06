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
const AddWorkScreen = () => {
  const [selectedYear, setSelectedYear] = useState();
  const [selectedMonth, setSelectedMonth] = useState();
  const [modalYear, setModalYear] = useState(false);
  const [modalMonth, setModalMonth] = useState(false);
  const [selectedEndYear, setSelectedEndYear] = useState();
  const [selectedEndMonth, setSelectedEndMonth] = useState();
  const [modalEndYear, setModalEndYear] = useState(false);
  const [modalEndMonth, setModalEndMonth] = useState(false);
  const [company, setCompany] = useState("Skr-Tech LLC");
  const [occupation, setOccupation] = useState("Front-end developer");
  const [position, setPosition] = useState("Chief Technology Officer");
  const [description, setDescription] = useState(
    "Өөрийн чадлаар 6жилийн туршлагатай"
  );
  const [location, setLocation] = useState("Улаанбаатар");
  const [selectedType, setSelectedType] = useState();
  const [modalType, setModalType] = useState(false);
  const sendCompanyDetail = () => {
    axios
      .post(`${api}/api/v1/experiences`, {
        company: company,
        occupation: occupation,
        position: position,
        description: description,
        start: `${selectedYear}-${selectedMonth}`,
        end: `${selectedEndYear}-${selectedEndMonth}`,
        isWorking: isEnabled,
        type: selectedType,
        location: location,
      })
      .then((res) => console.log(res.data.data))
      .catch((err) => console.log(err));
  };
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  return (
    <View style={{ flex: 1 }}>
      {/* Input details */}
      <View>
        <Text>Company ner </Text>
        <TextInput
          placeholder="Company ner"
          style={{ borderWidth: 1, padding: 5 }}
          value={company}
          onChangeText={setCompany}
        />
        <Text>occupation</Text>
        <TextInput
          placeholder="occupation"
          style={{ borderWidth: 1, padding: 5 }}
          value={occupation}
          onChangeText={setOccupation}
        />
        <Text>position</Text>
        <TextInput
          placeholder="position"
          style={{ borderWidth: 1, padding: 5 }}
          value={position}
          onChangeText={setPosition}
        />
        {/*  */}
        <Text> Ажлын type: </Text>
        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
          <Text style={{ fontSize: 20 }} onPress={() => setModalType(true)}>
            Ажлын type {selectedType}
          </Text>
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalType}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalType(!modalType);
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
                <Text style={styles.modalText}>Ажилд орсон жил</Text>
                <Picker
                  selectedValue={selectedType}
                  onValueChange={(itemValue, itemIndex) =>
                    setSelectedType(itemValue)
                  }
                  style={{ width: 200, height: 200 }}
                >
                  <Picker.Item label="Бүтэн цаг" value="Бүтэн цаг" />
                  <Picker.Item label="Хагас цаг" value="Хагас цаг" />
                  <Picker.Item label="freelancer" value="freelancer" />
                  <Picker.Item label="self-employed" value="self-employed" />
                  <Picker.Item label="contract" value="contract" />
                  <Picker.Item label="intern" value="intern" />
                  <Picker.Item label="apprentice" value="apprentice" />
                  <Picker.Item label="seasonal" value="seasonal" />
                </Picker>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalType(!modalType)}
                >
                  <Text style={styles.textStyle}>Сонгох</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </View>
        <Text>Байршил</Text>
        <TextInput
          placeholder="байршил"
          style={{ borderWidth: 1, padding: 5 }}
          value={location}
          onChangeText={setLocation}
        />
        <Text>Тайлбар</Text>
        <TextInput
          placeholder="тайлбар"
          style={{ borderWidth: 1, padding: 5 }}
          value={description}
          onChangeText={setDescription}
        />
      </View>

      <Text> Ажилд орсон огноо: </Text>
      <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
        {selectedYear ? (
          <Text style={{ fontSize: 20 }} onPress={() => setModalYear(true)}>
            {selectedYear}
          </Text>
        ) : (
          <Text style={{ fontSize: 20 }} onPress={() => setModalYear(true)}>
            Жил
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
              <Text style={styles.modalText}>Ажилд орсон жил</Text>
              <Picker
                selectedValue={selectedYear}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedYear(itemValue)
                }
                style={{ width: 200, height: 200 }}
              >
                <Picker.Item label="2000он" value="2000" />
                <Picker.Item label="2001он" value="2001" />
                <Picker.Item label="2002он" value="2002" />
                <Picker.Item label="2003он" value="2003" />
                <Picker.Item label="2004он" value="2004" />
                <Picker.Item label="2005он" value="2005" />
                <Picker.Item label="2006он" value="2006" />
                <Picker.Item label="2007он" value="2007" />
                <Picker.Item label="2008он" value="2008" />
                <Picker.Item label="2009он" value="2009" />
                <Picker.Item label="2010он" value="2010" />
                <Picker.Item label="2011он" value="2011" />
                <Picker.Item label="2012он" value="2012" />
                <Picker.Item label="2013он" value="2013" />
                <Picker.Item label="2014он" value="2014" />
                <Picker.Item label="2015он" value="2015" />
                <Picker.Item label="2016он" value="2016" />
                <Picker.Item label="2017он" value="2017" />
                <Picker.Item label="2018он" value="2018" />
                <Picker.Item label="2019он" value="2019" />
                <Picker.Item label="2020он" value="2020" />
                <Picker.Item label="2021он" value="2021" />
                <Picker.Item label="2022он" value="2022" />
                <Picker.Item label="2023он" value="2023" />
              </Picker>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalYear(!modalYear)}
              >
                <Text style={styles.textStyle}>Сонгох</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        {selectedMonth ? (
          <Text style={{ fontSize: 20 }}> {selectedMonth} </Text>
        ) : (
          <Text style={{ fontSize: 20 }} onPress={() => setModalMonth(true)}>
            Сар
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
              <Text style={styles.modalText}>Ажилд орсон жил</Text>
              <Picker
                selectedValue={selectedMonth}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedMonth(itemValue)
                }
                style={{ width: 200, height: 200 }}
              >
                <Picker.Item label="1сар" value="1" />
                <Picker.Item label="2сар" value="2" />
                <Picker.Item label="3сар" value="3" />
                <Picker.Item label="4сар" value="4" />
                <Picker.Item label="5сар" value="5" />
                <Picker.Item label="6сар" value="6" />
                <Picker.Item label="7сар" value="7" />
                <Picker.Item label="8сар" value="8" />
                <Picker.Item label="9сар" value="9" />
                <Picker.Item label="10сар" value="10" />
                <Picker.Item label="11сар" value="11" />
                <Picker.Item label="12сар" value="12" />
              </Picker>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalMonth(!modalMonth)}
              >
                <Text style={styles.textStyle}>Сонгох</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
      <Text> Одоо ажиллаж байгаа эсэх? </Text>
      <View style={{ flexDirection: "row" }}>
        <Text> Ажиллаж байгаа? </Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
        <Text> ajilaas garsan </Text>
      </View>
      {!isEnabled ? (
        <>
          <Text> Ажилaас гарсан огноо: </Text>
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
                Жил
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
                  <Text style={styles.modalText}>Ажилд орсон жил</Text>
                  <Picker
                    selectedValue={selectedEndYear}
                    onValueChange={(itemValue, itemIndex) =>
                      setSelectedEndYear(itemValue)
                    }
                    style={{ width: 200, height: 200 }}
                  >
                    <Picker.Item label="2000он" value="2000" />
                    <Picker.Item label="2001он" value="2001" />
                    <Picker.Item label="2002он" value="2002" />
                    <Picker.Item label="2003он" value="2003" />
                    <Picker.Item label="2004он" value="2004" />
                    <Picker.Item label="2005он" value="2005" />
                    <Picker.Item label="2006он" value="2006" />
                    <Picker.Item label="2007он" value="2007" />
                    <Picker.Item label="2008он" value="2008" />
                    <Picker.Item label="2009он" value="2009" />
                    <Picker.Item label="2010он" value="2010" />
                    <Picker.Item label="2011он" value="2011" />
                    <Picker.Item label="2012он" value="2012" />
                    <Picker.Item label="2013он" value="2013" />
                    <Picker.Item label="2014он" value="2014" />
                    <Picker.Item label="2015он" value="2015" />
                    <Picker.Item label="2016он" value="2016" />
                    <Picker.Item label="2017он" value="2017" />
                    <Picker.Item label="2018он" value="2018" />
                    <Picker.Item label="2019он" value="2019" />
                    <Picker.Item label="2020он" value="2020" />
                    <Picker.Item label="2021он" value="2021" />
                    <Picker.Item label="2022он" value="2022" />
                    <Picker.Item label="2023он" value="2023" />
                  </Picker>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalEndYear(!modalEndYear)}
                  >
                    <Text style={styles.textStyle}>Сонгох</Text>
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
                Сар
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
                  <Text style={styles.modalText}>Ажилд орсон жил</Text>
                  <Picker
                    selectedValue={selectedEndMonth}
                    onValueChange={(itemValue, itemIndex) =>
                      setSelectedEndMonth(itemValue)
                    }
                    style={{ width: 200, height: 200 }}
                  >
                    <Picker.Item label="1сар" value="1" />
                    <Picker.Item label="2сар" value="2" />
                    <Picker.Item label="3сар" value="3" />
                    <Picker.Item label="4сар" value="4" />
                    <Picker.Item label="5сар" value="5" />
                    <Picker.Item label="6сар" value="6" />
                    <Picker.Item label="7сар" value="7" />
                    <Picker.Item label="8сар" value="8" />
                    <Picker.Item label="9сар" value="9" />
                    <Picker.Item label="10сар" value="10" />
                    <Picker.Item label="11сар" value="11" />
                    <Picker.Item label="12сар" value="12" />
                  </Picker>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalEndMonth(!modalEndMonth)}
                  >
                    <Text style={styles.textStyle}>Сонгох</Text>
                  </Pressable>
                </View>
              </View>
            </Modal>
          </View>
        </>
      ) : (
        <Text>Ажиллаж байгаа</Text>
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
        Илгээх
      </Text>
    </View>
  );
};

export default AddWorkScreen;

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
