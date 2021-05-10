import React from "react";
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


const HomeScreen = (props) => {

    const [headerBtn, setHeaderBtn]=React.useState({title: '+', style:styles.addNewBtn});
    const [reRender, setReRender]=React.useState(false);
    
    // useFocusEffect(React.useCallback(() => { setReRender(true); } , [reRender]))
    // React.useEffect(()=>{setReRender(reRender-1)},[])
    // useFocusEffect(()=>{setReRender(reRender+1)});
    const isFocused = useIsFocused()

    React.useEffect(() => {
        setReRender(!reRender)
    } , [isFocused])
    
    const ListNotes = () => {
        const notesConsumer=React.useContext(NotesContext);
        return (<View>
            {notesConsumer.notes.map((value, index) => {
                if (value.isFile())
                    return <NoteItem key={index} note={value} navigation={props.navigation} />;
            })}</View>);
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