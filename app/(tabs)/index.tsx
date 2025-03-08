import {StyleSheet, View, Text, Platform, Image, Button, TextInput, ScrollView, RefreshControl} from 'react-native';
import DateTimePicker, { DateType, getDefaultStyles } from 'react-native-ui-datepicker';
import {useState} from "react";
import {globalStyles} from "@/app/globalStyle";
import day from "react-native-ui-datepicker/src/components/day";
import Calendar from "react-native-ui-datepicker/lib/typescript/components/calendar";

export default function HomeScreen() {
  const [nameNumber, setNameNumber] = useState<number>(0)
  const [birthdayNumber, setBirthdayNumber] = useState<number>(0)
  const [luckyNumber, setLuckyNumber] = useState<number>(0)

  const [name, setName] = useState<string>("")
  const [fatherName, setFatherName] = useState<string>("")
  const [selected, setSelected] = useState<DateType>();

  const [isRefreshing, setIsRefreshing] = useState(false);
  const onRefresh = () => {
    setIsRefreshing(true);

    setTimeout(() => setIsRefreshing(false), 500); // Example delay to simulate reloading
  };

  const fetchData = async () => {
    try {
      const response = await fetch('http://192.168.0.233:5000/calculate/luckynumbers', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({name, fatherName, selected})
      });
      response.json().then(({luckybirthdaynumber, luckynamenumber, luckynumber}) => {
        setLuckyNumber(luckynumber)
        setNameNumber(luckynamenumber)
        setBirthdayNumber(luckybirthdaynumber)
      })
    } catch (error) {
      console.error(error)
    }
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={true}
      refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}
      style={globalStyles.container}>
      <Text style={{fontSize: 20, textTransform: "uppercase", fontWeight: 800}}>Tell us about yourself</Text>
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
  ButtonWrapper: {
    paddingVertical: 30,
    width: "100%",
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
    width: "100%",
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    paddingHorizontal: 10,
  },
});
