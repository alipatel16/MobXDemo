import React from "react";
import { View, TextInput, StyleSheet } from "react-native";

const Input = ({ placeholder, value, onChangeText, type, style }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, style]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        keyboardType={!!type ? type : 'default'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex : 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    maxHeight : 100,
    margin: 5,
  },
  input: {
    fontSize: 16,
  },
});

export default Input;
