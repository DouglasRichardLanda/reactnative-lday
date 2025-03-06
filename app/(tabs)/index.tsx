import {StyleSheet, View, Text, Platform, Image, Button, TextInput, ScrollView} from 'react-native';
import DateTimePicker, { DateType, getDefaultStyles } from 'react-native-ui-datepicker';
import {useState} from "react";

export default function HomeScreen() {
  const [nameNumber, setNameNumber] = useState<number>(0)
  const [birthdayNumber, setBirthdayNumber] = useState<number>(0)
  const [luckyNumber, setLuckyNumber] = useState<number>(0)

  const [name, setName] = useState<string>("")
  const [fatherName, setFatherName] = useState<string>("")
  const [selected, setSelected] = useState<DateType>();

  const fetchData = async () => {
    try {
      console.log(name)
      console.log(fatherName)
      console.log(selected)
      await fetch('http://192.168.0.233:5000/calculate/luckynumbers', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({name, fatherName, selected})
      });
    } catch (error) {
      console.error(error)
    }
  };

  return (
    <ScrollView style={{ backgroundColor: "white", paddingHorizontal: 20, paddingVertical: 40}}>
      <Text style={styles.title}>Luck calculator</Text>
      <View style={styles.inputFields}>
        <TextInput
          style={styles.input}
          placeholder="Write your full name"
          value={name}
          onChangeText={setName}
        />
      </View>
      <View style={styles.inputFields}>
        <TextInput
          style={styles.input}
          placeholder="Write your father's name"
          value={fatherName}
          onChangeText={setFatherName}
        />
      </View>
      <DateTimePicker
        mode="single"
        date={selected}
        hideHeader={false}
        navigationPosition={"right"}
        containerHeight={300}
        onChange={({ date }) =>  setSelected(date)}
        style={{
          marginTop: 20,
          padding: 15,
          borderRadius: 10,
          borderColor: "black",
          backgroundColor: "gray"
        }}
        styles={{
          today: {backgroundColor: "black"},
          today_label: {color: "white"},
          weekdays: {backgroundColor: "white", borderRadius: 5},
          selected: {backgroundColor: "white"},
          selected_label: {color: "black"}
        }}
      />
      <View style={styles.mainBtn}>
        <Button title={"CALCULATE"} onPress={fetchData} />
      </View>
      <View style={styles.infoFlex}>
        <View style={styles.box}>
          <Text style={styles.boxTitle}>Name Number</Text>
          <Text style={styles.boxTitle}>{nameNumber}</Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.boxTitle}>Birthday Number</Text>
          <Text style={styles.boxTitle}>{birthdayNumber}</Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.boxTitle}>Lucky Number</Text>
          <Text style={styles.boxTitle}>{luckyNumber}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  datePicker: {

  },
  title: {
    fontSize: 30,
  },
  input: {
    width: 200,
    height: 40,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  mainBtn: {
    paddingVertical: 30,
    width: "50%"
  },
  infoFlex: {
    flexDirection: "row",
    justifyContent: "space-around",
    gap: 10,
  },
  box: {
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  boxTitle: {
    fontWeight: 800,
    fontSize: 22,
    textAlign: "center"
  },
  inputFields: {
    marginTop: 10,
  }
});
