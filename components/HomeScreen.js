import React from "react";
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View, Button, Pressable } from "react-native";
import { Colors, DebugInstructions, Header, LearnMoreLinks, ReloadInstructions, } from "react-native/Libraries/NewAppScreen";
import "react-native-gesture-handler";
import { NavigationContainer, useFocusEffect } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import showdown from "showdown";
import WebView from "react-native-webview";
import styles from '../assets/styles';
import RNFS from "react-native-fs";
import { NotesContext, NotesConsumer } from './Contexts';
import NoteItem from './NoteItem';
import { DIR, newName, standardScreenName } from "../constants/constants";


const HomeScreen = (props) => {

    const [headerBtn, setHeaderBtn]=React.useState({title: '+', style:styles.addNewBtn});
    
    useFocusEffect(()=>{console.log('focus')})
    
    const ListNotes = () => {
        return (<NotesConsumer>
            {(data) => data.notes.map((value, index) => {
                if (value.isFile())
                    return <NoteItem key={index} note={value} navigation={props.navigation} />;
            })}</NotesConsumer>);
    }

    const handleNewBtn = () => {
        const noteName = newName('note-');
        const path = DIR + `/${noteName}.md`;
        RNFS.writeFile(path,'','utf8').then(success=>props.navigation.navigate('newNote',{path:path})).catch(e=>alert('Problem creating or loading the note!'));
        
    }

    React.useLayoutEffect(() => {
        props.navigation.setOptions({
            headerRight: () => (
                <View style={styles.homeHeaderBtnCont}>
                    <Pressable onPress={handleNewBtn} style={styles.addNewBtn}><Text style={styles.addNewBtnText}>+</Text></Pressable>
                </View>
                
            )
        })
    }, [props.navigation]);

    return (
        <ScrollView style={styles.homeScreen}>
            <ListNotes />
        </ScrollView>
    );
}
export default HomeScreen;