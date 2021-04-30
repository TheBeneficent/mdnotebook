/**
 * Simple Notebook with markdown support
 * https://github.com/TheBeneficent/mdnotebook
 */

import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View } from "react-native";
import { Colors, DebugInstructions, Header, LearnMoreLinks, ReloadInstructions, } from "react-native/Libraries/NewAppScreen";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { DIR, standardScreenName } from "./constants/constants";
import showdown from "showdown";
import WebView from "react-native-webview";
import RNFS from "react-native-fs";
import NoteItem from "./components/NoteItem";
import Note from './components/Note';
import HomeScreen from './components/HomeScreen';
import styles from './assets/styles';
import {NotePathProvider, NotesProvider} from './components/Contexts';

const Stack = createStackNavigator();

const App = () => {
  const isDarkMode = useColorScheme() === "dark";

  const [notes, setNotes] = useState([]);
  useEffect(() => {
    RNFS.readDir(DIR).then(result => setNotes(result)).catch(e => alert('An error occurred reading directory!'));
    notes.map((value, index) =>console.log('note map: ', value))
    
  }, []);
  notes.map((value, index) =>console.log('note map: ', value))

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <NotesProvider value={notes}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="notes">
          <Stack.Screen name="notes" options={{ title: "Notes" }} component={HomeScreen}/>
          {notes.length ? notes.map((value, index) => <Stack.Screen key={index} name={standardScreenName(value.mtime)} options={{ title: '' }}>{props=><Note {...props} note={value} />}</Stack.Screen> ) : <></>}
        </Stack.Navigator>
      </NavigationContainer>
    </NotesProvider>

  );
};

export default App;