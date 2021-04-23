/**
 * Simple Notebook with markdown support
 * https://github.com/TheBeneficent/mdnotebook
 */

import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View } from "react-native";
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from "react-native/Libraries/NewAppScreen";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { DIR } from "./constants/constants";
import showdown from "showdown";
import WebView from "react-native-webview";
import RNFS from "react-native-fs";
import NoteItem from "./components/NoteItem";

const HomeScreen = () => {

  const [notes, setNotes] = useState([]);
  useEffect(() => {
    RNFS.readDir(DIR).then(result => setNotes(result)).catch(e=>alert('An error occurred reading directory!'));
  }, []);

  const ListNotes = () => <View>{notes.map((value, index) => {
    if (value.isFile())
      return <NoteItem key={index} note={value} />;
  })}</View>;

  const createNote = () => {
    const d = new Date();
    const name = d.getFullYear().toString() + d.getMonth().toString() + d.getDate().toString() + d.getHours().toString() + d.getMinutes().toString() + d.getSeconds().toString() + d.getMilliseconds().toString();
    const path = RNFS.DocumentDirectoryPath + `/${name}.md`;
  };


  return (
    <View style={{ flex: 1 }}>
      <ListNotes />
    </View>
  );
};

const Stack = createStackNavigator();


const App = () => {
  const isDarkMode = useColorScheme() === "dark";

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (

    <NavigationContainer>
      <Stack.Navigator initialRouteName="Notes">
        <Stack.Screen name="Notes" component={HomeScreen} options={{ title: "Notes" }} />

      </Stack.Navigator>
    </NavigationContainer>


  );
};


const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "400",
  },
  highlight: {
    fontWeight: "700",
  },
  noteItem: {
    margin: 1,
    paddingHorizontal: 1,
    paddingVertical: 2,
  },
});

export default App;
