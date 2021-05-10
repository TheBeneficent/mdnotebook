import React, { useEffect, useState } from "react";
import {Button, Pressable, SafeAreaView, ScrollView, ToastAndroid, StatusBar, StyleSheet, Text, Modal, useColorScheme, View,} from "react-native";
import showdown from "showdown";
import WebView from "react-native-webview";
import RNFS from "react-native-fs";
import CheckBox from '@react-native-community/checkbox';
import styles from '../assets/styles';
import { standardScreenName } from "../constants/constants";
import DeleteDial from './DeleteDial';

const NoteItem = ( props) => {
  const [prevText, setPrevText] = useState('');
  const [noteCheck, setNoteCheck]=useState(false);
  const [modalVisible, setModalVisible]=useState(false);
// console.log('NoteItem props: ', props.note)
  useEffect(()=>{
    RNFS.readFile(props.note.path,'utf8').then(res=>setPrevText(res)).catch(e=>{alert('An error occured reading files!'); props.navigation.navigate('notes')});
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
    setModalVisible(true);
  }

  const deleteHandle=()=>{
    RNFS.unlink(props.note.path).then(() => {setModalVisible(false); ToastAndroid.show("Note deleted successfully!", ToastAndroid.SHORT)}).catch(e=>alert("Error deleting the note!"));
  }

  //const handleNoteItemPress=
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Are you sure to delete this note?</Text>
            <View>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={deleteHandle}
            >
              <Text style={styles.textStyle}>YES</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>NO</Text>
            </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <Pressable onPress={pressHandle} onLongPress={longPressHandle}>
        <NotePrev />
        </Pressable>
    </View>
  );

};
export default NoteItem;
