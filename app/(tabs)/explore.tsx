import {StyleSheet, Image, Platform, View, Text} from 'react-native';
import {globalStyles} from "@/app/globalStyle";

export default function TabTwoScreen() {
  return (
    <View style={globalStyles.container}>
      <Text style={{fontSize: 20, textDecorationLine: "underline", color: "green"}}>Calculate the day to you</Text>

    </View>
  );
}

const styles = StyleSheet.create({

});
