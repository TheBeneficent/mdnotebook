/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from "react";
import {SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View,} from "react-native";

import {Colors, DebugInstructions, Header, LearnMoreLinks, ReloadInstructions} from "react-native/Libraries/NewAppScreen";

import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";


import showdown from "showdown";
import WebView from "react-native-webview";

import RNFS from 'react-native-fs';

import NoteItem from "./components/NoteItem";


const HomeScreen = () => {


  const listNotes=notesPath=>{
    RNFS.readDir(notesPath).then(result=>{
      console.log(result)
      result.map((value,index)=>{
        return <NoteItem note={value} key={index} />;
      });
    });
  }

  listNotes('/storage/emulated/0/Android/data/com.mdnotebook/files');

  const createNote=()=>{
    const d=new Date();
    const name=d.getFullYear().toString()+d.getMonth().toString()+d.getDate().toString()+d.getHours().toString()+d.getMinutes().toString()+d.getSeconds().toString()+d.getMilliseconds().toString();
    const path = RNFS.DocumentDirectoryPath + `/${name}.md`;
  }



  return (
    <View style={{ flex: 1 }}>

    </View>
  );
}

const Stack = createStackNavigator();


const App = () => {
  const isDarkMode = useColorScheme() === "dark";

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (

    <NavigationContainer>
      <Stack.Navigator initialRouteName='Notes'>
        <Stack.Screen name='Notes' component={HomeScreen} options={{title: 'Notes'}} />

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
});

export default App;
