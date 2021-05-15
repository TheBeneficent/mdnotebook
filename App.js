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
import {NotePathProvider, NotesProvider, NotesContext} from './components/Contexts';
import NewNote from "./components/NewNote";

const Stack = createStackNavigator();

const App = () => {
  const isDarkMode = useColorScheme() === "dark";

  const [notes, setNotes] = useState([]);
  const NotesCons=React.useContext(NotesContext);
  useEffect(() => {
    RNFS.readDir(DIR).then(result => {
      let newResult=result.map(value=>({...value, checked:false}));
      setNotes(newResult);
    }).catch(e => alert('An error occurred reading directory!'));


  }, [NotesCons]);
  console.log('appjs notes: ', NotesCons);
  // notes.map((value, index) =>console.log('note map: ', value))

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const updateNotes=(index,checkStat)=>{
    let tempNotes=notes;
    tempNotes[index].checked=checkStat;
    setNotes(tempNotes);
  }

  return (

      <NavigationContainer>
        <Stack.Navigator initialRouteName="notes">
          <Stack.Screen name="notes" options={{ title: "Notes", headerStyle:styles.homeScreenHeader}}>{props=><HomeScreen {...props} notes={notes} />}</Stack.Screen>
          {notes.length ? notes.map((value, index) => <Stack.Screen key={index} name={standardScreenName(value.mtime)} options={{ title: '', headerStyle: styles.homeScreenHeader }}>{props=><Note {...props} note={value} />}</Stack.Screen> ) : <></>}
          <Stack.Screen name='newNote' options={{title:'', headerStyle: styles.homeScreenHeader }} component={NewNote}/>
        </Stack.Navigator>
      </NavigationContainer>


  );
};

export default App;
