import { useEffect } from "react";
import { View, Text, StyleSheet, Alert, Pressable } from "react-native";
import { inject, observer } from "mobx-react";
import { useIsFocused, useNavigation } from "@react-navigation/native";

import HeaderIcon from "../components/HeaderRight";
import ExpenseList from "../components/ExpenseList";

import colors from "../utils/colors";
import moment from "moment";

const All = inject("expenseStore")(
  observer(({ expenseStore }) => {
    
    const { expenseList } = expenseStore;
    const isFocused = useIsFocused();
    const navigation = useNavigation();

    function headerPressHandler() {
      navigation.navigate("Add Transactions", { isEditing: false });
    }

    function onItemPressHandler(itemId) {
      navigation.navigate("Add Transactions", {
        isEditing: true,
        itemId: itemId,
      });
    }

    useEffect(() => {
      if (isFocused) {
        navigation.setOptions({
          headerRight: () => {
            return <HeaderIcon onPress={headerPressHandler} />;
          },
        });
      }
    }, [isFocused]);

    const renderItem = ({ item }) => (
      <Pressable
        style={styles.item}
        onPress={onItemPressHandler.bind(this, item.id)}
      >
        <View>
          <Text style={styles.textDate}>
            {moment(item.date).format("DD-MM-yyyy")}
          </Text>
          <Text style={styles.textDisc}>{item.text}</Text>
        </View>
        <Text style={styles.textAmount}>₹{item.amount}</Text>
      </Pressable>
    );

    const keyExtractor = (item) => item.id;

    return (
      <View style={styles.container}>
        {expenseList.length > 0 ? (
          <ExpenseList
            data={expenseList}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
          />
        ) : (
          <View style={styles.centerContainer}>
            <Text style={styles.noData}>No Transactions History Available</Text>
          </View>
        )}
      </View>
    );
  })
);
export default All;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.secondary,
    marginHorizontal: 5,
    marginTop: 5,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  textLastTransactions: {
    fontSize: 16,
    fontWeight: "500",
    marginHorizontal: 5,
    marginTop: 5,
    padding: 10,
    borderRadius: 5,
    backgroundColor: colors.secondary,
    color: "white",
  },
  textDisc: {
    fontSize: 12,
  },
  textAmount: {
    fontSize: 14,
    color: colors.dark,
    borderColor: colors.secondary,
    backgroundColor: colors.secondary,
    padding: 5,
    borderWidth: 1,
    borderRadius: 5,
    color: "white",
    minWidth: 60,
    textAlign: "center",
  },
  textDate: {
    fontSize: 14,
    fontWeight : '500'
  },
  noData: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
  },
  centerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
