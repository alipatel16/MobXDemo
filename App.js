import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import colors from "./src/utils/colors";
import { Provider } from "mobx-react";

//Screens
import Recent from "./src/screens/RecentTransactions";
import All from "./src/screens/AllTrasactions";
import AddUpdate from "./src/screens/AddUpdateExpenses";

//stores
import expenseStore from "./src/stores/expenseStore";

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

//Bottom Tab Navigator 
function BottomTabs() {
  return (
    <BottomTab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarLabelStyle: { fontSize: 14 },
      }}
    >
      <BottomTab.Screen
        name="Recent Trasactions"
        component={Recent}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="time"
              size={25}
              color={focused ? colors.primary : null}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="All Trasactions"
        component={All}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="calendar"
              size={25}
              color={focused ? colors.primary : null}
            />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

//Define MobX Store here 
const stores = {
  expenseStore,
};

export default function App() {
  return (
    <>
      <StatusBar style="dark" />
      <Provider {...stores}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Transactions" // Set the initial route
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen
              name="Transactions"
              component={BottomTabs}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Add Transactions"
              component={AddUpdate}
              options={{
                headerShown: true,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
