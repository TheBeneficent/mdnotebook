import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View, Button } from "react-native";
import { Colors, DebugInstructions, Header, LearnMoreLinks, ReloadInstructions, } from "react-native/Libraries/NewAppScreen";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import showdown from "showdown";
import WebView from "react-native-webview";
import styles from '../assets/styles';
import RNFS from "react-native-fs";
import { NotesConsumer } from './Contexts';
import NoteItem from './NoteItem';
import { DIR, newName } from "../constants/constants";

const HomeScreen = (props) => {
    const ListNotes = () => {
        return (<NotesConsumer>
            {(Notes) => Notes.map((value, index) => {
                if (value.isFile())
                    return <NoteItem key={index} note={value} navigation={props.navigation} />;
            })}</NotesConsumer>);
    }

    const handleNewBtn = () => {
        const noteName = newName('note-');
        const path = DIR + `/${noteName}.md`;
        RNFS.writeFile(path,'','utf8').then(success=>'')
        
        // props.navigation.navigate(standardScreenName(props.note.mtime))
    }

    React.useLayoutEffect(() => {
        props.navigation.setOptions({
            headerRight: () => (
                <Button onPress={handleNewBtn} title='+' />
            )
        })
    }, [props.navigation]);

    return (
        <View style={{ flex: 1 }}>
            <ListNotes />
        </View>
    );
}
export default HomeScreen;