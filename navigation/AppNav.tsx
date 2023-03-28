import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeStackNavigation from "./HomeStackNavigation";
const Stack = createNativeStackNavigator();
const AppNav = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: "#1560bd",
        },
        headerTintColor: "white",
      }}
    >
      <Stack.Screen name="home" component={HomeStackNavigation}/>
    </Stack.Navigator>
  );
};

export default AppNav;

const styles = StyleSheet.create({});
