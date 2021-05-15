import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  Pressable,
} from "react-native";
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from "react-native/Libraries/NewAppScreen";
import "react-native-gesture-handler";
import { NavigationContainer, useFocusEffect, useIsFocused } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import showdown from "showdown";
import WebView from "react-native-webview";
import styles from "../assets/styles";
import RNFS from "react-native-fs";
import { NotesContext, NotesConsumer, ReRenderContext, NotesProvider } from "./Contexts";
import NoteItem from "./NoteItem";
import { DIR, newName, standardScreenName } from "../constants/constants";
import ListNotes from "./ListNotes";


const HomeScreen = (props) => {

  const [headerBtn, setHeaderBtn] = React.useState({ title: "+", style: styles.addNewBtn });
  const [reRender, setReRender] = React.useState(false);
  const [notes, setNotes] = useState([]);

  const isFocused = useIsFocused();
  useFocusEffect(React.useCallback(() => {
    RNFS.readDir(DIR).then(result => {
      let newResult = result.map(value => ({ ...value, checked: false }));
      setNotes(newResult);
    }).catch(e => alert("An error occurred reading directory!"));
    console.log("home foc notes len: ", notes.length);
  }, []));

  React.useEffect(()=>{
    props.navigation.addListener(
      'didFocus',
      payload => {

      });
  },[]);


  const handleNewBtn = () => {
    const noteName = newName("note-");
    const path = DIR + `/${noteName}.md`;
    RNFS.writeFile(path, "", "utf8").then(success => props.navigation.navigate("newNote", { path: path })).catch(e => alert("Problem creating or loading the note!"));

  };

  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <View style={styles.homeHeaderBtnCont}>
          <Pressable onPress={handleNewBtn} style={styles.addNewBtn}><Text
            style={styles.addNewBtnText}>+</Text></Pressable>
        </View>

      ),
    });
  }, [props.navigation]);

  return (
    <NotesProvider value={notes}>
      <ScrollView style={styles.homeScreen}>
        <ListNotes notes={notes} navigation={props.navigation} />
      </ScrollView>
    </NotesProvider>
  );
};
export default HomeScreen;
