import React, { useState, useEffect } from "react";
import {  SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, Modal, Pressable, Text, TextInput, ToastAndroid, useColorScheme, View, useWindowDimensions } from "react-native";
import InputScrollView from "react-native-input-scroll-view";
import RNFS from "react-native-fs";
import styles from '../assets/styles';
import { md2html } from '../constants/constants';
import Icon from 'react-native-vector-icons/FontAwesome';
import HTML from 'react-native-render-html';

const Note = props => {
  const [content, setContent] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [saveAction, setSaveAction] = useState(false);
  const [renderedPreview, setRenderedPreview] = useState('<html dir="auto">' + md2html(content) + '</html>');
  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const [modalVisible, setModalVisible]=useState(false);
  const [test,setTest]=useState(false);

  React.useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <View style={styles.homeHeaderBtnCont}>
          <Pressable onPress={handlePreviewToggleButton} style={styles.prevEditBtn}><Text>{showPreview ? 'Edit' : 'Preview'}</Text></Pressable>
          <Icon.Button onPress={handleDeleteNote} name='trash' size={25} style={styles.deleteIcon} />
          {/* <Button onPress={handleDeleteNote}><Icon name='trash' size={30} style={styles.deleteIcon} /></Button> */}
        </View>

      )
    });
    RNFS.readFile(props.route.params.note.path, 'utf8').then(res => {setContent(String(res)); setRenderedPreview('<html dir="auto">' + md2html(res) + '</html>')}).catch(e => alert('Error reading the file!'));
    return ()=>{}
  }, [showPreview]);

  useEffect(() => {
    const saveDelay = setTimeout(() => {
      if (saveAction) {
        RNFS.unlink(props.route.params.note.path).then(() => {});
        RNFS.writeFile(props.route.params.note.path, content, 'utf8').then(success => ToastAndroid.show("Saved!", ToastAndroid.SHORT)).catch(e => ToastAndroid.show("Error, not saved!", ToastAndroid.SHORT));
      }

    }, 500);
    return () => clearTimeout(saveDelay);
  }, [content]);

  const handleContentChange = (text) => {
    setSaveAction(true);
    setContent(text);
  }

  const handlePreviewToggleButton = () => {
    setRenderedPreview('<html dir="auto">' + md2html(content) + '</html>');
    setShowPreview(!showPreview);

  }

  const deleteHandle=()=>{
    RNFS.unlink(props.route.params.note.path).then(() => {setModalVisible(false); props.navigation.navigate('notes',{refresh: String(new Date())}); ToastAndroid.show("Note deleted successfully!", ToastAndroid.SHORT)}).catch(e=>alert("Error deleting the note!"));
  }

  const handleDeleteNote=()=>{
    setModalVisible(true);
  }

  return (
    <ScrollView  style={styles.note}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
        onDismiss={() => setModalVisible(false)}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity activeOpacity={1} onPressOut={() => setModalVisible(false)} style={styles.container}>
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
        </TouchableOpacity>
      </Modal>
    { showPreview ?
      <HTML source={{ html: renderedPreview }}  />
      :
    <View >

        <InputScrollView>
          <TextInput onChangeText={text => handleContentChange(text)} value={content} multiline={true} style={styles.noteInput} />
        </InputScrollView>

    </View>
    }
    </ScrollView>
  );
}

export default Note;
