// import React, { useContext, useEffect, useRef, useState } from "react";
// import * as StoreReview from "expo-store-review";
// import {
//   Share,
//   Text,
//   View,
//   StyleSheet,
//   Image,
//   Switch,
//   Linking,
//   TouchableNativeFeedback,
// } from "react-native";
// import {
//   Entypo,
//   FontAwesome,
//   Ionicons,
//   MaterialCommunityIcons,
//   MaterialIcons,
// } from "@expo/vector-icons";
// import { ThemeContext } from "../context/ThemeContext";
// import theme from "../theme/theme";
// import { AuthContext } from "../context/AuthContext";
// import useAxiosPrivate from "../hooks/useAxiosPrivate";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useSelector } from "react-redux";
// import Toast from "react-native-toast-message";
// import Images from "./Images";
// interface User {
//   availability: string;
//   id: string;
//   firstname: string;
//   lastname: string;
//   email: string;
//   phonenumber: string;
//   profile_picture: string;
//   companyname: string;
// }

// interface UserState {
//   user: User;
// }

// const RateUs = async () => {
//   if (await StoreReview.isAvailableAsync()) {
//     StoreReview.requestReview()
//       .then(function (response) {
//         console.log("response is", response);
//       })
//       .catch((e) => {
//         if (e instanceof Error) {
//           console.log(e);
//         }
//       });
//   }
// };
// const ShareApp = async () => {
//   const url =
//     "https://play.google.com/store/apps/details?id=com.muriuki.AIOS&hl=en&gl=US";
//   try {
//     const result = await Share.share({
//       title: "App link",
//       message:
//         "Please install this app and stay safe , AppLink :https://play.google.com/store/apps/details?id=com.muriuki.AIOS&hl=en&gl=US",
//       url: "https://play.google.com/store/apps/details?id=com.muriuki.AIOS&hl=en&gl=US",
//     });
//     if (result.action === Share.sharedAction) {
//       if (result.activityType) {
//       } else {
//       }
//     } else if (result.action === Share.dismissedAction) {
//     }
//   } catch (error) {
//     if (error instanceof Error) {
//       alert(error.message);
//     }
//   }
// };
// const COLORS = [
//   "#0088FE",
//   "#FF8042",
//   "#00C49F",
//   "#4B0082",
//   "#A020F0",
//   "#DC143C",
//   "#D16587",
// ];
// const randomNumber = Math.floor(Math.random() * 6) + 1;
// const CustomDrawer = ({ navigation }) => {
//   const axiosPrivate = useAxiosPrivate();
//   const { darkmode, setDarkMode } = useContext(ThemeContext);
//   const { role, auth, setAuth, setLoggedIn, setRole } = useContext(AuthContext);
//   const [status, setStatus] = useState("");
//   const userdetails = useSelector((state: { user: UserState }) => state?.user);
//   const queryClient = useQueryClient();
//   const showToast = (type: string, title: string, desc: string) => {
//     Toast.show({
//       type: type,
//       text1: title,
//       text2: desc,
//     });
//   };

//   const LogOut = async (token: string) => {
//     const res = await axiosPrivate.post(
//       "/mk_company_personell_logout_information",
//       JSON.stringify({
//         mk_refresh_token: token,
//       }),
//       {
//         headers: { Authorization: "Bearer " + auth?.accessToken },
//       }
//     );
//     return res.data;
//   };
//   const UpdateStatus = async (status: string) => {
//     const res = await axiosPrivate.patch(
//       "/mk_company_personell_update_availability_status_information",
//       JSON.stringify({
//         mk_personell_availability_status: status,
//       }),
//       {
//         headers: { Authorization: "Bearer " + auth?.accessToken },
//       }
//     );
//     return res.data;
//   };

//   const removeItemValue = async (key: string) => {
//     try {
//       await AsyncStorage.removeItem(key);
//       return true;
//     } catch (exception) {
//       return false;
//     }
//   };

//   const LogOutMutation = useMutation({
//     mutationFn: LogOut,
//     onSuccess(data, variables, context) {
//       console.log(data);
//       if ((data.status = 200)) {
//         removeItemValue("refreshToken");
//         removeItemValue("role");
//         setAuth({});
//         setRole("");
//         setLoggedIn(false);
//       }
//     },
//     onError(error: { message: string }, variables, context) {
//       console.log(error.message);
//     },
//   });

//   const UpdateStatusMutation = useMutation({
//     mutationFn: UpdateStatus,
//     onSuccess(data) {
//       console.log(data);
//       if ((data.status = 200)) {
//         // showToast(
//         //   "success",
//         //   `${status}`,
//         //   `${
//         //     status === "AVAILABLE"
//         //       ? `You are now available for meetings`
//         //       : status === "UNAVAILABLE"
//         //       ? "You will not be available for meetings"
//         //       : ""
//         //   }`
//         // );
//       }
//     },
//     onError(error: { message: string }) {
//       console.log(error.message);
//     },
//   });
//   const previousDeps = useRef<string | undefined>();
//   useEffect(() => {
//     if (
//       JSON.stringify(previousDeps.current) !==
//       JSON.stringify(userdetails?.user?.availability)
//     ) {
//       if (userdetails?.user?.availability !== undefined) {
//         console.log("function run");
//         console.log(userdetails?.user?.availability);
//         setStatus(userdetails?.user?.availability);
//       }
//       previousDeps.current = userdetails?.user?.availability;
//     }
//   }, [userdetails?.user?.availability]);

//   const handleLogout = () => {
//     LogOutMutation.mutate(auth?.refreshToken);
//   };
//   const isMounted = useRef(false);
//   useEffect(() => {
//     const firstRender = isMounted.current;
//     if (firstRender) {
//       isMounted.current = false;
//     } else {
//       if (status === "AVAILABLE") {
//         UpdateStatusMutation.mutate("AVAILABLE");
//       }
//       if (status === "UNAVAILABLE") {
//         setStatus("UNAVAILABLE");
//         UpdateStatusMutation.mutate("UNAVAILABLE");
//       }
//     }
//   }, [status]);
//   return (
//     <View
//       style={{
//         flex: 1,
//         backgroundColor:
//           role !== "GateKeeper"
//             ? darkmode
//               ? theme.dark.background
//               : theme.light.background
//             : "#fff",
//       }}
//     >
//       <View style={{ marginBottom: 20 }}>
//         <View
//           style={{
//             height: 200,
//             flexDirection: "column",
//             alignItems: "center",
//             justifyContent: "center",
//             marginTop: 0,
//             backgroundColor:
//               role === "GateKeeper"
//                 ? "#fff"
//                 : darkmode
//                 ? theme.dark.background
//                 : theme.light.background,
//           }}
//         >
//           <View
//             style={{
//               position: "absolute",
//               left: 0,
//               padding: 10,
//               bottom: 0,
//               paddingLeft: 20,
//             }}
//           >
//             {userdetails?.user?.profile_picture?.length > 0 ? (
//               <Images
//                 height={60}
//                 width={60}
//                 image={{
//                   uri: userdetails?.user?.profile_picture,
//                 }}
//               />
//             ) : (
//               <View
//                 style={[
//                   styles.tinyLogo,
//                   { backgroundColor: COLORS[randomNumber] },
//                 ]}
//               >
//                 <Text style={styles.avatartext}>
//                   {userdetails?.user?.firstname
//                     ? userdetails?.user?.firstname[0].toUpperCase() +
//                       "" +
//                       userdetails?.user?.lastname[0].toUpperCase()
//                     : ""}
//                 </Text>
//               </View>
//             )}

//             <Text
//               style={{
//                 marginVertical: 5,
//                 marginHorizontal: 5,
//                 fontSize: 18,
//                 fontWeight: "600",
//                 color:
//                   role === "GateKeeper"
//                     ? "#000"
//                     : darkmode
//                     ? theme.dark.textcolor
//                     : theme.light.textcolor,
//               }}
//             >
//               {`${
//                 userdetails?.user.firstname + " " + userdetails?.user.lastname
//               }`}
//             </Text>
//             <View
//               style={{
//                 flexDirection: "row",
//                 alignItems: "center",
//                 justifyContent:
//                   role !== "GateKeeper" ? "space-around" : "flex-start",
//               }}
//             >
//               <Text
//                 style={{
//                   marginVertical: 5,
//                   marginHorizontal: 5,
//                   fontSize: 16,
//                   fontWeight: "500",
//                   color:
//                     role === "GateKeeper"
//                       ? "#000"
//                       : darkmode
//                       ? theme.dark.textcolor
//                       : theme.light.textcolor,
//                 }}
//               >
//                 {role}
//               </Text>
//               {role !== "GateKeeper" && (
//                 <View
//                   style={{
//                     flexDirection: "row",
//                     alignItems: "center",
//                     marginLeft: 20,
//                   }}
//                 >
//                   <Text
//                     style={[
//                       styles.statustext,
//                       {
//                         color: status === "AVAILABLE" ? "#2ECC71" : "#1E90FF",
//                       },
//                     ]}
//                   >
//                     {status === "AVAILABLE" ? "Available" : "Away"}
//                   </Text>
//                   <Switch
//                     style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
//                     value={status === "AVAILABLE" ? true : false}
//                     thumbColor={status === "AVAILABLE" ? "#2ECC71" : "#1E90FF"}
//                     onValueChange={(value) => {
//                       if (value === true) {
//                         setStatus("AVAILABLE");
//                       } else {
//                         setStatus("UNAVAILABLE");
//                       }
//                     }}
//                   />
//                 </View>
//               )}
//             </View>
//           </View>
//         </View>
//       </View>
//       {role !== "GateKeeper" && (
//         <TouchableNativeFeedback
//           background={TouchableNativeFeedback.Ripple(
//             role !== "GateKeeper" ? "#1E90FF" : "#2196F3",
//             false
//           )}
//         >
//           <View
//             style={styles.draweritem}
//             onTouchStart={() => navigation.navigate("account")}
//           >
//             <Ionicons
//               name="person"
//               size={21}
//               color={role !== "GateKeeper" ? "#1E90FF" : "#2196F3"}
//             />
//             <Text
//               style={[
//                 styles.drawertext,
//                 {
//                   color:
//                     role !== "GateKeeper"
//                       ? darkmode
//                         ? theme.dark.textcolor
//                         : theme.light.textcolor
//                       : "#000",
//                 },
//               ]}
//             >
//               Profile
//             </Text>
//           </View>
//         </TouchableNativeFeedback>
//       )}
//       <TouchableNativeFeedback
//         background={TouchableNativeFeedback.Ripple(
//           role !== "GateKeeper" ? "#1E90FF" : "#2196F3",
//           false
//         )}
//       >
//         <View
//           style={styles.draweritem}
//           onTouchStart={() =>
//             Linking.openURL(
//               "https://play.google.com/store/apps/details?id=com.muriuki.AIOS&showAllReviews=true"
//             )
//           }
//         >
//           <MaterialIcons
//             name="star-rate"
//             size={23}
//             color={role !== "GateKeeper" ? "#1E90FF" : "#2196F3"}
//           />
//           <Text
//             style={[
//               styles.drawertext,
//               {
//                 color:
//                   role !== "GateKeeper"
//                     ? darkmode
//                       ? theme.dark.textcolor
//                       : theme.light.textcolor
//                     : "#000",
//               },
//             ]}
//           >
//             Rate Us
//           </Text>
//         </View>
//       </TouchableNativeFeedback>
//       <TouchableNativeFeedback
//         background={TouchableNativeFeedback.Ripple(
//           role !== "GateKeeper" ? "#1E90FF" : "#2196F3",
//           false
//         )}
//       >
//         <View
//           style={styles.draweritem}
//           onTouchStart={() =>
//             Linking.openURL(
//               "https://pages.flycricket.io/all-in-one-scanner-1/privacy.html"
//             )
//           }
//         >
//           <MaterialIcons
//             name="privacy-tip"
//             size={23}
//             color={role !== "GateKeeper" ? "#1E90FF" : "#2196F3"}
//           />
//           <Text
//             style={[
//               styles.drawertext,
//               {
//                 color:
//                   role !== "GateKeeper"
//                     ? darkmode
//                       ? theme.dark.textcolor
//                       : theme.light.textcolor
//                     : "#000",
//               },
//             ]}
//           >
//             Privacy Policy
//           </Text>
//         </View>
//       </TouchableNativeFeedback>
//       <TouchableNativeFeedback
//         background={TouchableNativeFeedback.Ripple(
//           role !== "GateKeeper" ? "#1E90FF" : "#2196F3",
//           false
//         )}
//       >
//         <View style={styles.draweritem} onTouchStart={ShareApp}>
//           <Entypo
//             name="share"
//             size={23}
//             color={role !== "GateKeeper" ? "#1E90FF" : "#2196F3"}
//           />
//           <Text
//             style={[
//               styles.drawertext,
//               {
//                 color:
//                   role !== "GateKeeper"
//                     ? darkmode
//                       ? theme.dark.textcolor
//                       : theme.light.textcolor
//                     : "#000",
//               },
//             ]}
//           >
//             Share with Friends
//           </Text>
//         </View>
//       </TouchableNativeFeedback>
//       <TouchableNativeFeedback
//         background={TouchableNativeFeedback.Ripple(
//           role !== "GateKeeper" ? "#1E90FF" : "#2196F3",
//           false
//         )}
//       >
//         <View style={styles.draweritem} onTouchStart={handleLogout}>
//           <FontAwesome
//             name="sign-out"
//             size={23}
//             color={role !== "GateKeeper" ? "#1E90FF" : "#2196F3"}
//           />
//           <Text
//             style={[
//               styles.drawertext,
//               {
//                 color:
//                   role !== "GateKeeper"
//                     ? darkmode
//                       ? theme.dark.textcolor
//                       : theme.light.textcolor
//                     : "#000",
//               },
//             ]}
//           >
//             Sign-Out
//           </Text>
//         </View>
//       </TouchableNativeFeedback>
//       <View style={styles.bottom}>
//         {role !== "GateKeeper" && (
//           <View style={styles.draweritembottom}>
//             {darkmode ? (
//               <Entypo
//                 name="light-up"
//                 size={23}
//                 color={role !== "GateKeeper" ? "#1E90FF" : "#2196F3"}
//               />
//             ) : (
//               <Ionicons name="moon" size={23} color="black" />
//             )}
//             <Text
//               style={[
//                 styles.drawertext,
//                 {
//                   color: darkmode
//                     ? theme.dark.textcolor
//                     : theme.light.textcolor,
//                 },
//               ]}
//             >
//               {darkmode ? "Light Mode" : "Dark Mode"}
//             </Text>
//             <Switch
//               style={{
//                 marginLeft: 20,
//                 transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }],
//               }}
//               thumbColor={darkmode ? "#1E90FF" : "#CCCCCC"}
//               value={darkmode}
//               onValueChange={async (value) => {
//                 try {
//                   setDarkMode(value);
//                   await AsyncStorage.setItem("darkmode", value?.toString());
//                 } catch (e) {
//                   console.log(e);
//                 }
//               }}
//             />
//           </View>
//         )}
//       </View>
//     </View>
//   );
// };

// export default CustomDrawer;
// const styles = StyleSheet.create({
//   tinyLogo: {
//     width: 60,
//     height: 60,
//     borderRadius: 50,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   draweritem: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 15,
//     paddingLeft: 20,
//     height: 45,
//   },
//   drawertext: {
//     fontSize: 18,
//     paddingLeft: 20,
//   },
//   statustext: {
//     marginBottom: 5,
//     fontSize: 18,
//     paddingLeft: 20,
//   },
//   bottom: {
//     position: "absolute",
//     bottom: 2,
//   },

//   draweritembottom: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     marginBottom: 15,
//     paddingLeft: 20,
//     height: 45,
//     width: "auto",
//   },
//   avatartext: {
//     letterSpacing: 1.6,
//     color: "#fff",
//     fontSize: 20,
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
