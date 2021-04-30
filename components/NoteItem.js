import React, { useEffect, useState } from "react";
import {Button, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, useColorScheme, View,} from "react-native";
import showdown from "showdown";
import WebView from "react-native-webview";
import RNFS from "react-native-fs";
import styles from '../assets/styles';
import { standardScreenName } from "../constants/constants";

const NoteItem = ( props) => {
  const [prevText, setPrevText] = useState('');
// console.log('NoteItem props: ', props.note)
  useEffect(()=>{
    RNFS.readFile(props.note.path,'utf8').then(res=>setPrevText(res)).catch(e=>alert('An error occured reading files!'));
  },[])

  const trunc = str => {

  };

  //const handleNoteItemPress=
  return (
    <React.Fragment>
      <Button title={prevText} onPress={()=>props.navigation.navigate(standardScreenName(props.note.mtime))} />
    </React.Fragment>
  );

};
export default NoteItem;
