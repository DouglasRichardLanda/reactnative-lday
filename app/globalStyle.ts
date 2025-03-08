import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 30,
    backgroundColor: 'white',
    width: "100%",
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
  input: {
    width: '100%',  // Make the input take the full width
    height: 40,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    paddingHorizontal: 10,
  }
});