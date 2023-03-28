import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabNavigator from './BottomTabNavigator';
const Stack = createNativeStackNavigator();
const HomeStackNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="primarybottomtab"
    screenOptions={{
    //   headerStyle: {
    //     backgroundColor: darkmode
    //       ? theme.dark.background
    //       : "#1E90FF",
    //   },
    //   headerTintColor: darkmode
    //     ? theme.dark.textcolor
    //     : "#fff",
    }}
    >
      <Stack.Screen
        name="bottomtab"
        options={{ headerShown: false }}
        component={BottomTabNavigator}
      />
      {/* <Stack.Screen options={{title:"Meeting Invitation"}}  name="MeetingInvitation" component={NewInvitation} />
      <Stack.Screen options={{title:"Profile"}} name="account" component={Profile}/> */}
    </Stack.Navigator>
  )
}

export default HomeStackNavigation

const styles = StyleSheet.create({})