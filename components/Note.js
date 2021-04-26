import React, { useState } from "react";
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, useColorScheme, View } from "react-native";
import showdown from "showdown";
import WebView from "react-native-webview";
import RNFS from "react-native-fs";
import { useEffect } from "react/cjs/react.production.min";
import styles from '../assets/styles';
import {NotePathConsumer} from './Contexts';

const Note=props=>{

  const converter = new showdown.Converter();

  const [content, setContent]=useState(RNFS.readFile(props.path));
  const [showPreview, setShowPreview]=useState(false);

  useEffect(()=>{

  },[]);
  

  const [renderedPreview, setRenderedPreview]=useState('<html dir="auto">'+converter.makeHtml(content)+'</html>');

  const handleContentChange=(text)=>{
    setContent(text);

  }

  const handlePreviewToggleButton=()=>{
    setRenderedPreview('<html dir="auto">'+converter.makeHtml(content)+'</html>');
  }

  return(
    <View style={{flex:1}}>
      {showPreview ?
        <WebView originWhitelist={['*']} source={{ renderedPreview }}/> :
        <TextInput onChangeText={text=>handleContentChange(text)} value={content} /> }
    </View>
  );
}

export default Note;
