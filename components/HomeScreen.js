import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View } from "react-native";
import { Colors, DebugInstructions, Header, LearnMoreLinks, ReloadInstructions, } from "react-native/Libraries/NewAppScreen";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { DIR } from "./constants/constants";
import showdown from "showdown";
import WebView from "react-native-webview";
import styles from '../assets/styles';
import RNFS from "react-native-fs";
import {NotesConsumer, NoteItemProvider} from './Contexts';
import NoteItem from './NoteItem';



const HomeScreen = (props) => {
    const ListNotes = () => <NotesConsumer>
        {(Notes)=>Notes.map((value, index) => {
            if (value.isFile())
                return <NoteItem key={index} note={value} />;
        })}</NotesConsumer>;

    const createNote = () => {
        const d = new Date();
        const name = d.getFullYear().toString() + d.getMonth().toString() + d.getDate().toString() + d.getHours().toString() + d.getMinutes().toString() + d.getSeconds().toString() + d.getMilliseconds().toString();
        const path = RNFS.DocumentDirectoryPath + `/${name}.md`;
    };


    return (
        <View style={{ flex: 1 }}>
            <ListNotes />
        </View>
    );
}
export default HomeScreen;