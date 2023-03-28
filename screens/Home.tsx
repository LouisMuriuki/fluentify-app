import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Home = () => {
  return (
    <View style={styles.container}>
      <View style={styles.greetingscontainer}>
        <Text style={styles.greetingstext}>Hi,Lui</Text>
      </View>
      <View style={styles.suggestionsection}>
        <View style={styles.topsuggestionsection}>
          <Text>English word</Text>
          <Text>refresh</Text>
        </View>
        <View style={styles.middlesuggestionsection}>
          <Text>This word means this and that while listening to kibe argue with his boyfriend</Text>
        </View>
        <View style={styles.bottomsuggestionsection}>
          <Text></Text>
        </View>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  greetingscontainer: {
    marginTop: 0,
    marginHorizontal: 20,
    marginBottom: 10,
  },
  greetingstext: {
    paddingLeft: 5,
    paddingBottom: 5,
    fontSize: 22,
  },
  suggestionsection: {
    display: "flex",
    flexDirection: "column",
  },
  topsuggestionsection: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  middlesuggestionsection: {
    display: "flex",
    flexDirection: "row",
  },
  bottomsuggestionsection: {
    display: "flex",
    flexDirection: "row",
  },
  schedulebubblecontainer: {
    overflow: "hidden",
    height: 180,
    borderRadius: 15,
    marginHorizontal: 20,
  },
});
