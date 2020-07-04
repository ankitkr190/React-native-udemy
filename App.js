import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Contants from "expo-constants";

import Home from "./screens/Home";

import CreateEmployee from "./screens/CreateEmployee";

import Profile from "./screens/Profile";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const myOptions = {
  title: "Developers Hub",
  headerTintColor: "white",
  headerStyle: {
    backgroundColor: "#006aff",
  },
};

function App() {
  return (
    <View style={styles.container}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={myOptions} />
        <Stack.Screen
          name="Create"
          component={CreateEmployee}
          options={{ ...myOptions, title: "Create employee" }}
        />
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
      {/* <Home />  */}
      {/* <CreateEmployee/>  */}
      {/* <Profile /> */}
    </View>
  );
}

export default () => {
  return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e0e0e0",
    // marginTop: Contants.statusBarHeight,
    //  alignItems: 'center',

    // justifyContent: 'center'
  },
});