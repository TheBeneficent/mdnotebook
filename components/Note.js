import React, { useState, useEffect } from "react";
import { Button, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, ToastAndroid, useColorScheme, View } from "react-native";
import WebView from "react-native-webview";
import RNFS from "react-native-fs";
import styles from '../assets/styles';
import {md2html} from '../constants/constants';

const Note=props=>{
  const [content, setContent]=useState('');
  const [showPreview, setShowPreview]=useState(false);
  const [saveAction, setSaveAction]=useState(false);
  const [renderedPreview, setRenderedPreview]=useState('<html dir="auto">'+md2html(content)+'</html>');

  const handleContentChange=(text)=>{
    setSaveAction(true);
    setContent(text);
  }

  const handlePreviewToggleButton=()=>{
    setRenderedPreview('<html dir="auto">'+md2html(content)+'</html>');
    setShowPreview(!showPreview);
  }

  React.useLayoutEffect(()=>{
    props.navigation.setOptions({
      headerRight: ()=>(
        <Button onPress={handlePreviewToggleButton} title={showPreview ? 'Edit' : 'Preview'} />
      )
    })
  },[props.navigation]);

  useEffect(()=>{
    RNFS.readFile(props.note.path, 'utf8').then(res=>setContent(String(res))).catch(e=>alert('Error reading the file!'));
  },[]);

  useEffect(() => {
    const saveDelay = setTimeout(() => {
      if(saveAction){
        RNFS.unlink(props.note.path).then(()=>console.log('deleted'));
        RNFS.writeFile(props.note.path, content, 'utf8').then(success=>ToastAndroid.show("Saved!", ToastAndroid.SHORT)).catch(e=>ToastAndroid.show("Error, not saved!", ToastAndroid.SHORT));
      }
      
    }, 500);
    console.log('content: ', content)
    return () => clearTimeout(saveDelay);
  }, [content]);

  return(
    <View style={{flex:1}}>
      {showPreview ?
        <WebView originWhitelist={['*']} source={{ renderedPreview }}/> :
        <TextInput onChangeText={text=>handleContentChange(text)} value={content} /> }
    </View>
  );
}

export default Note;
