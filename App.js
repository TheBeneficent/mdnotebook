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
import { DIR } from "./constants/constants";
import showdown from "showdown";
import WebView from "react-native-webview";
import RNFS from "react-native-fs";
import NoteItem from "./components/NoteItem";
import Note from './components/Note';
import HomeScreen from './components/HomeScreen';
import styles from './assets/styles';
import {NotePathProvider, NotesProvider} from './components/Contexts';

const Stack = createStackNavigator();

const NotesContext = React.createContext([]);

const App = () => {
  const isDarkMode = useColorScheme() === "dark";

  const [notes, setNotes] = useState([]);
  useEffect(() => {
    RNFS.readDir(DIR).then(result => setNotes(result)).catch(e => alert('An error occurred reading directory!'));
  }, []);
  console.log(notes)

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  

  return (
    <NotesProvider value={notes}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="notes">
          <Stack.Screen name="notes" options={{ title: "Notes" }} component={HomeScreen}/>
          {notes.map((value, index) => <NotePathProvider value={value}><Stack.Screen key={index} name={value.name} options={{ title: '' }} component={Note}/></NotePathProvider> )}
        </Stack.Navigator>
      </NavigationContainer>
    </NotesProvider>

  );
};


export default App;
export {NotesContext};