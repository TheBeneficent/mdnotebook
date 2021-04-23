import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, useColorScheme, View } from "react-native";
import showdown from "showdown";
import WebView from "react-native-webview";
import RNFS from "react-native-fs";
import { DIR } from "../constants/constants";

const NoteItem = props => {
  const [prevText, setPrevText] = useState('');

  useEffect(()=>{
    RNFS.readFile(props.note.path,'utf8').then(res=>setPrevText(res)).catch(e=>alert('An error occured reading files!'));
  },[])

  const trunc = str => {

  };
console.log(prevText)
  return (
    <View>
      <Text>{prevText}</Text>
    </View>
  );

};
export default NoteItem;
