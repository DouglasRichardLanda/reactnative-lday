import {StyleSheet, Image, Platform, View, Text, TextInput, Button, ScrollView} from 'react-native';
import {globalStyles} from "@/app/globalStyle";
import {useState} from "react";
import DateTimePicker, {DateType} from "react-native-ui-datepicker";

export default function TabTwoScreen() {

  const [luckyNumber, setLuckyNumber] = useState<string>("")
  const [birthdayNumber, setBirthdayNumber] = useState<string>("")
  const [nameNumber, setNameNumber] = useState<string>("")

  const [selected, setSelected] = useState<DateType>()

  const [first, setFirst] = useState<string>("")
  const [second, setSecond] = useState<string>("")
  const [full, setFull] = useState<string>("")

  const fetchData = async () => {
    const response = await fetch(`http://192.168.0.233:5000/calculate/compare?lnumber=${luckyNumber}&lbirthday=${birthdayNumber}&lname=${nameNumber}&specdate=${selected}`, {
      method: "GET",
      headers: {"Content-Type": "application/json"}
    })
    response.json().then(({firsthalf, fullday, secondhalf}) => {
      setFirst(firsthalf)
      setSecond(secondhalf)
      setFull(fullday)
    })
  }

  return (
    <ScrollView style={globalStyles.container}>
      <Text style={{fontSize: 20, textTransform: "uppercase", fontWeight: 800}}>Calculate the day to you</Text>
      <View style={styles.numericFlex}>
        <View style={styles.inputFields}>
          <TextInput
            style={styles.inputNumeric}
            placeholder="Write your lucky number"
            keyboardType="numeric"
            value={luckyNumber}
            onChangeText={setLuckyNumber}
          />
        </View>
        <View style={styles.inputFields}>
          <TextInput
            style={styles.inputNumeric}
            keyboardType="numeric"
            placeholder="Write your name number"
            value={nameNumber}
            onChangeText={setNameNumber}
          />
        </View>
        <View style={styles.inputFields}>
          <TextInput
            style={styles.inputNumeric}
            keyboardType="numeric"
            placeholder="Write your birthday number"
            value={birthdayNumber}
            onChangeText={setBirthdayNumber}
          />
        </View>
      </View>
      <DateTimePicker
        mode="single"
        date={selected}
        hideHeader={false}
        navigationPosition={"right"}
        containerHeight={300}
        onChange={({ date }) => setSelected(date)}
        components={{
          IconNext: <Text style={{color: "black", fontWeight: 800}}>NEXT</Text>,
          IconPrev: <Text style={{color: "black", fontWeight: 800}}>PREV</Text>,
        }}
        style={{

        }}
        styles={{
          day_label: {fontWeight: 600},
          selected_label: {color: "white"},
          selected: {backgroundColor: "black"},
          selected_month: { backgroundColor: "black" },
          month_label: {color: "black"},
          selected_month_label: {color: "white"},
          selected_year: {backgroundColor: "black"},
          selected_year_label: {color: "white"},
          today: {backgroundColor: "darkgray"}
        }}
      />
      <View style={styles.ButtonWrapper}>
        <Button title={"CALCULATE"} onPress={fetchData} />
      </View>
      <Text style={{ marginVertical: 5, color: first === "good day" ? "green" : first === "bad day" ? "red" : "orange"}}>
        <Text style={{fontWeight: 'bold'}}>First half:</Text>           {first}
      </Text>
      <Text style={{ marginVertical: 5, color: second === "good day" ? "green" : second === "bad day" ? "red" : "orange"}}>
        <Text style={{fontWeight: 'bold'}}>Second half:</Text>     {second}
      </Text>
      <Text style={{ marginVertical: 5, color: full === "good day" ? "green" : full === "bad day" ? "red" : "orange"}}>
        <Text style={{fontWeight: 'bold'}}>Full day:</Text>             {full}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  numericFlex: {
    gap: 20
  },
  inputFields: {
  },
  inputNumeric: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  ButtonWrapper: {
    paddingVertical: 30,
    width: "100%",
  },
});
