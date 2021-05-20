import React from "react";
import {  ScrollView, Text, View,  Pressable,} from "react-native";
import "react-native-gesture-handler";
import { NavigationContainer, useFocusEffect, useIsFocused } from "@react-navigation/native";
import styles from "../assets/styles";
import RNFS from "react-native-fs";
import { DIR, newName } from "../constants/constants";
import ListNotes from "./ListNotes";

const HomeScreen = (props) => {

  const [headerBtn, setHeaderBtn] = React.useState({ title: "+", style: styles.addNewBtn });
  const [notes, setNotes] = React.useState([]);

  const isFocused = useIsFocused();
  useFocusEffect(React.useCallback(() => {
    RNFS.readDir(DIR).then(result => {
      let newResult = result.map(value => ({ ...value, checked: false }));
      setNotes(newResult);
    }).catch(e => alert("An error occurred reading directory!"));
    console.log("home foc notes len: ", notes.length, '\tparams: ', props.route.params);
  }, [props.route.params+props.navigation+isFocused]));

  const handleNewBtn = () => {
    const noteName = newName("note-");
    const path = DIR + `/${noteName}.md`;
    RNFS.writeFile(path, "", "utf8").then(success => props.navigation.navigate("note", { note: {path: path, isFile:()=>true, name: noteName, checked: false}})).catch(e => alert("Problem creating or loading the note!"));

  };

  React.useEffect(() => {
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
      <ScrollView style={styles.homeScreen}>
        <ListNotes notes={notes} navigation={props.navigation} />
      </ScrollView>
  );
};
export default HomeScreen;
