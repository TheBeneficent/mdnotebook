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



const converter = new showdown.Converter();
let text = `
# mark
`;
let html = converter.makeHtml(text);

const HomeScreen = () => {

  RNFS.readDir(RNFS.DocumentDirectoryPath).then(result=>{
    console.log('result: ', result);
    return Promise.all([RNFS.stat(result[0].path), result[0].path]);
  }).then(statResult=>{
    if (statResult[0].isFile())
      // if we have a file, read it
      return RNFS.readFile(statResult[1], 'utf8');

    return 'no file';
  }).then(contents=>{
    console.log(contents);
  }).catch(err => {
    console.log('error: ', err.message, err.code);
  });

  return (
    <View style={{ flex: 1 }}>
      <WebView originWhitelist={['*']} source={{ html }}  />
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
