import { StyleSheet, Text, View } from 'react-native'
import { createDrawerNavigator } from "@react-navigation/drawer";
import Avatar from '../components/Avatar';
import Home from '../screens/Home';
const Drawer = createDrawerNavigator();
const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
    // drawerContent={(props: any) => <CustomDrawer navigation={navigation} {...props} />}
    screenOptions={({ navigation }) => ({
      // headerLeft: () => <DrawerIcon navigation={navigation}  />,
      headerRight: () => <Avatar onPress={()=>navigation.toggleDrawer()} />,
      headerShadowVisible: false,
      title: "",
    //   headerStyle: {
    //     backgroundColor: darkmode
    //       ? theme.dark.background
    //       : theme.light.background,
    //   },
    //   headerTintColor: darkmode
    //   ? theme.dark.textcolor
    //   : theme.light.textcolor,
    })}
  >
    <Drawer.Screen name="home" component={Home} />
  </Drawer.Navigator>
  )
}

export default DrawerNavigation

const styles = StyleSheet.create({})