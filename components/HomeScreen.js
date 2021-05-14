import React, {useEffect, useState} from "react";
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View, Button, Pressable } from "react-native";
import { Colors, DebugInstructions, Header, LearnMoreLinks, ReloadInstructions, } from "react-native/Libraries/NewAppScreen";
import "react-native-gesture-handler";
import { NavigationContainer, useFocusEffect, useIsFocused } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import showdown from "showdown";
import WebView from "react-native-webview";
import styles from '../assets/styles';
import RNFS from "react-native-fs";
import { NotesContext, NotesConsumer, ReRenderContext } from './Contexts';
import NoteItem from './NoteItem';
import { DIR, newName, standardScreenName } from "../constants/constants";
import { Navigation } from 'react-native-navigation';


const HomeScreen = (props) => {
    const [headerBtn, setHeaderBtn]=React.useState({title: '+', style:styles.addNewBtn});
    const [reRender, setReRender]=React.useState(false);
    const [notes, setNotes] = useState([]);
    const ReRender=React.useContext(ReRenderContext);

  useEffect(() => {
    RNFS.readDir(DIR).then(result => {
      let newResult=result.map(value=>({...value, checked:false}));
      setNotes(newResult);
    }).catch(e => alert('An error occurred reading directory!'));
    setReRender(false);

    const listener = {
      componentDidAppear: () => {
        console.log('RNN', `componentDidAppear`);
        RNFS.readDir(DIR).then(result => {
          let newResult=result.map(value=>({...value, checked:false}));
          setNotes(newResult);
        }).catch(e => alert('An error occurred reading directory!'));
      },
      componentDidDisappear: () => {
        console.log('RNN', `componentDidDisappear`);
      }
    }
    const unsubscribe = Navigation.events().registerComponentListener(listener, props.componentId);
    return () => {
      unsubscribe.remove();
    };
  }, []);
    
    const ListNotes = () => {
        const notesConsumer=React.useContext(NotesContext);
        console.log('notesConsumer: ', notesConsumer)
        return (<View>
            {notes.map((value, index) => {
                if (value.isFile())
                    {

                      return <NoteItem key={index} note={value} componentId={props.componentId} />;
                    }
            })}</View>);
    }

    const handleNewBtn = () => {
        const noteName = newName('note-');
        const path = DIR + `/${noteName}.md`;return <NoteItem key={index} note={value} navigation={props.navigation} />;
        RNFS.writeFile(path,'','utf8').then(success=>props.navigation.navigate('newNote',{path:path})).catch(e=>alert('Problem creating or loading the note!'));
        
    }

    /* React.useLayoutEffect(() => {
        props.navigation.setOptions({
            headerRight: () => (
                <View style={styles.homeHeaderBtnCont}>
                    <Pressable onPress={handleNewBtn} style={styles.addNewBtn}><Text style={styles.addNewBtnText}>+</Text></Pressable>
                </View>
                
            )
        })
    }, [props.navigation]); */

    return (
        <ScrollView style={styles.homeScreen}>
            <ListNotes />
        </ScrollView>
    );
}

HomeScreen.options = {
    topBar: {
      title: {
        text: 'Notes',
        color: styles.homeScreenHeader.color
      },
      background: {
        color: styles.homeScreenHeader.backgroundColor
      },
      rightButtons: [
        {
          component: 'NewBtn',
          passProps: {
            componentId: props.componentId
          },
        },
      ]
    }
  }
export default HomeScreen;