import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable, Alert } from "react-native";
import { inject, observer } from "mobx-react";
import Input from "../components/Input";

import { useRoute, useNavigation } from "@react-navigation/native";
import colors from "../utils/colors";
import { Ionicons } from "@expo/vector-icons";

import moment from "moment";

const AddUpdate = inject("expenseStore")(
  observer(({ expenseStore }) => {

    const [amount, setAmount] = useState("");
    const [date, setDate] = useState("");
    const [desc, setDesc] = useState("");

    const route = useRoute();
    const navigation = useNavigation();
    const isEditing = route.params.isEditing;
    const itemId = route?.params?.itemId;

    const handleTextChange = (setter, value) => {
      setter(value);
    };

    function onCancelClickListener() {
      navigation.goBack();
    }

    //for generating unique id for each item which is newly created 
    function generateUniqueId() {
      const timestamp = new Date().getTime(); // Get current timestamp
      const randomNum = Math.floor(Math.random() * 1000000); // Generate random number
      return `${timestamp}-${randomNum}`;
    }

    const isValid = () => {
      // Check if amount is a valid number
      if (isNaN(parseFloat(amount))) {
        Alert.alert(
          "Validation Error",
          "Please enter correct amount before submitting",
          [{ text: "OK", style: "default" }]
        );
        return false;
      }

      // Check if date is a valid date and not greater than today
      const enteredDate = moment(date, "YYYY-MM-DD");
      if (!enteredDate.isValid() || enteredDate.isAfter(moment(), "day")) {
        Alert.alert(
          "Validation Error",
          "Please enter a correct date that is not greater than today",
          [{ text: "OK", style: "default" }]
        );
        return false;
      }

      // Check if description is not empty
      if (desc.trim() === "") {
        Alert.alert(
          "Validation Error",
          "Please enter description before submitting",
          [{ text: "OK", style: "default" }]
        );
        return false;
      }

      return true;
    };

    function onSubmitListener() {
      if (isValid()) {
        if (isEditing) {
          const updatedItem = {
            id: itemId,
            amount: amount,
            date: new Date(date),
            text: desc,
          };

          expenseStore.updateExpense(itemId, updatedItem);
        } else {
          const newItem = {
            id: generateUniqueId(),
            amount: amount,
            date: new Date(date),
            text: desc,
          };
          expenseStore.addExpense(newItem);
        }
        navigation.navigate("Transactions");
      }
    }

    function onDeleteListener() {
      Alert.alert("Delete Item", "You sure want to delete this item?", [
        {
          text: "Yes",
          style: "default",
          onPress: () => {
            expenseStore.deleteExpense(itemId);
            navigation.navigate("Transactions");
          },
        },
        { text: "No", style: "destructive" },
      ]);
    }

    useEffect(() => {
      //This will pre-populate data when has clicked on any item
      if (itemId) {
        const item = expenseStore.getItemById(itemId);

        const date = moment(item.date).format("yyyy-MM-DD");
        setDate(date);
        setDesc(item.text);
        setAmount(item.amount.toString());
      }
    }, [navigation, route]);

    return (
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <Input
            placeholder="Enter Amount"
            value={amount}
            onChangeText={(text) => handleTextChange(setAmount, text)}
            type="number-pad"
          />
          <Input
            placeholder="Enter Date"
            value={date}
            onChangeText={(text) => handleTextChange(setDate, text)}
          />
        </View>
        <Input
          placeholder="Enter Description"
          value={desc}
          onChangeText={(text) => handleTextChange(setDesc, text)}
        />
        <View style={[styles.innerContainer, { marginVertical: 10 }]}>
          <Pressable
            style={styles.cancelButton}
            onPress={onCancelClickListener}
          >
            <Text style={[styles.ButtonText, { textAlign: "center" }]}>
              Cancel
            </Text>
          </Pressable>
          <Pressable style={styles.updateButton} onPress={onSubmitListener}>
            <Text
              style={[
                styles.ButtonText,
                { color: "white", textAlign: "center" },
              ]}
            >
              {!isEditing ? "Add" : "Update"}
            </Text>
          </Pressable>
        </View>
        {isEditing && (
          <>
            <View style={styles.devider} />
            <Pressable style={styles.iconContainer} onPress={onDeleteListener}>
              <Ionicons name="md-trash-bin" size={30} color="red" />
            </Pressable>
          </>
        )}
      </View>
    );
  })
);

export default AddUpdate;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  devider: {
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    margin: 10,
  },
  updateButton: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 5,
    backgroundColor: colors.primary,
    minWidth: 100,
  },
  cancelButton: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.secondary,
    paddingHorizontal: 20,
    paddingVertical: 5,
    minWidth: 100,
  },
  ButtonText: { fontWeight: "500", fontSize: 16 },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
});
