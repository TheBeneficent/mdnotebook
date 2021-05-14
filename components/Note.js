import React, { useState, useEffect } from "react";
import {  SafeAreaView, ScrollView, StatusBar, StyleSheet, Modal, Pressable, Text, TextInput, ToastAndroid, useColorScheme, View, useWindowDimensions } from "react-native";
import WebView from "react-native-webview";
import RNFS from "react-native-fs";
import styles from '../assets/styles';
import { md2html } from '../constants/constants';
import InputScrollView from 'react-native-input-scroll-view';
import { Button, Menu, Divider, Provider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import HTML from 'react-native-render-html';
import DeleteDial from './DeleteDial';
import { Navigation } from 'react-native-navigation';

const Note = props => {
  const [content, setContent] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [saveAction, setSaveAction] = useState(false);
  const [renderedPreview, setRenderedPreview] = useState('<html dir="auto">' + md2html(content) + '</html>');
  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const [modalVisible, setModalVisible]=useState(false);

  const handleContentChange = (text) => {
    setSaveAction(true);
    setContent(text);
  }

  const handlePreviewToggleButton = () => {
    console.log('prev: ', showPreview);
    setRenderedPreview('<html dir="auto">' + md2html(content) + '</html>');
    setShowPreview(!showPreview);
  }

  const deleteHandle=()=>{
    RNFS.unlink(props.note.path).then(() => {setModalVisible(false); props.navigation.goBack(); ToastAndroid.show("Note deleted successfully!", ToastAndroid.SHORT)}).catch(e=>alert("Error deleting the note!"));
  }

  const handleDeleteNote=()=>{
    setModalVisible(true);
  }

  /* React.useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <View style={styles.homeHeaderBtnCont}>
          <Button onPress={handlePreviewToggleButton}>{showPreview ? 'Edit' : 'Preview'}</Button>
          <Icon.Button onPress={handleDeleteNote} name='trash' size={25} style={styles.deleteIcon} />
          
        </View>
        
      )
    })
  }, [props.navigation]); */


  useEffect(() => {
    RNFS.readFile(props.note.path, 'utf8').then(res => {setContent(String(res)); setRenderedPreview('<html dir="auto">' + md2html(res) + '</html>')}).catch(e => alert('Error reading the file!'));

    const listener = {
      componentDidAppear: () => {
        console.log('RNN', `componentDidAppear`);
        
      },
      componentDidDisappear: () => {
        console.log('RNN', `componentDidDisappear`);
        
      }
    }
    const unsubscribe = Navigation.events().registerComponentListener(listener, props.componentId);
    return () => {
      // Make sure to unregister the listener during cleanup
      unsubscribe.remove();
    };

  }, []);

  useEffect(() => {
    const saveDelay = setTimeout(() => {
      if (saveAction) {
        RNFS.unlink(props.note.path).then(() => console.log('deleted'));
        RNFS.writeFile(props.note.path, content, 'utf8').then(success => ToastAndroid.show("Saved!", ToastAndroid.SHORT)).catch(e => ToastAndroid.show("Error, not saved!", ToastAndroid.SHORT));
      }

    }, 500);
    console.log('content: ', content)
    return () => clearTimeout(saveDelay);
  }, [content]);

  return (
    <ScrollView style={{flex:1}}>
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
    { showPreview ? 
      <HTML source={{ html: renderedPreview }} contentWidth={useWindowDimensions().width} />
      :
    <Provider>
    <View style={styles.note}>
    
      
        
        <InputScrollView>
          <TextInput onChangeText={text => handleContentChange(text)} value={content} multiline={true} style={styles.noteInput} /> 
        </InputScrollView>
        
    </View>
    </Provider>
    }
    </ScrollView>
  );
}

export default Note;
