import React, { useEffect, useState, useContext } from "react";
import {Button, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, useColorScheme, View,} from "react-native";
import showdown from "showdown";
import WebView from "react-native-webview";
import RNFS from "react-native-fs";
import styles from '../assets/styles';
import {NoteItemConsumer} from './Contexts';

const NoteItem = ({navigation}) => {
  const [prevText, setPrevText] = useState(useContext(NoteItemConsumer));

  useEffect(()=>{
    console.log('prevText: ', prevText)
    // RNFS.readFile(props.note.path,'utf8').then(res=>setPrevText(res)).catch(e=>alert('An error occured reading files!'));
  },[])

  const trunc = str => {

  };
console.log('prevText: ', prevText)
  return (
    
      <Button title={prevText} onPress={navigation.navigate('')} />
    
  );

};
export default NoteItem;
