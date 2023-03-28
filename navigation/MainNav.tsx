import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import AppNav from "./AppNav";
const MainNav = () => {
  return (
    <NavigationContainer>
      <StatusBar />
      <AppNav />
    </NavigationContainer>
  );
};

export default MainNav;

const styles = StyleSheet.create({});
