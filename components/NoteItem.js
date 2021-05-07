import React, { useEffect, useState } from "react";
import {Button, Pressable, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, useColorScheme, View,} from "react-native";
import showdown from "showdown";
import WebView from "react-native-webview";
import RNFS from "react-native-fs";
import CheckBox from '@react-native-community/checkbox';
import styles from '../assets/styles';
import { standardScreenName } from "../constants/constants";

const NoteItem = ( props) => {
  const [prevText, setPrevText] = useState('');
  const [noteCheck, setNoteCheck]=useState(false);
// console.log('NoteItem props: ', props.note)
  useEffect(()=>{
    RNFS.readFile(props.note.path,'utf8').then(res=>setPrevText(res)).catch(e=>alert('An error occured reading files!'));
  },[]);

  const NotePrev=(props)=>{
    return(
      <React.Fragment>
        <View style={styles.noteItem}>
          <Text style={styles.noteItemText} numberOfLines={3} ellipsizeMode='tail'>{trunc(prevText)}</Text>
          {/* <CheckBox disabled={false} value={noteCheck} /> */}
        </View>
      </React.Fragment>
    )
  }

  const trunc = str => {
    return str;
  }

  const pressHandle=()=>{
    props.navigation.navigate(standardScreenName(props.note.mtime))
  }

  const longPressHandle=()=>{

  }

  //const handleNoteItemPress=
  return (
    <React.Fragment>
      <Pressable onPress={pressHandle} onLongPress={longPressHandle}>
        <NotePrev />
        </Pressable>
    </React.Fragment>
  );

};
export default NoteItem;
