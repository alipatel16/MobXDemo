import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons"; // You can use any icon library you prefer
import colors from "../utils/colors";

const HeaderIcon = ({ onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.pressable,
        { opacity: pressed ? 0.7 : 1 },
      ]}
    >
      <AntDesign name="plussquareo" size={25} color={colors.primary} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressable: {
    padding: 10,
  },
});

export default HeaderIcon;
