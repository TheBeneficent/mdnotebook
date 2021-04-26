import React, { useEffect, useState } from "react";
import {Button, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, useColorScheme, View,} from "react-native";
import showdown from "showdown";
import WebView from "react-native-webview";
import RNFS from "react-native-fs";
import styles from '../assets/styles';

const NoteItem = ({navigation}) => {
  const [prevText, setPrevText] = useState('');

  useEffect(()=>{
    RNFS.readFile(props.note.path,'utf8').then(res=>setPrevText(res)).catch(e=>alert('An error occured reading files!'));
  },[])

  const trunc = str => {

  };
console.log(prevText)
  return (
    <React.Fragment>
      <Button title={prevText} onPress={navigation.navigate('')} />
    </React.Fragment>
  );

};
export default NoteItem;
