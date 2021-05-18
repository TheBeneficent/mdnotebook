/**
 * Simple Notebook with markdown support
 * https://github.com/TheBeneficent/mdnotebook
 */

import React, { useEffect, useState } from "react";
import { useColorScheme} from "react-native";
import {Colors} from "react-native/Libraries/NewAppScreen";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { DIR } from "./constants/constants";
import RNFS from "react-native-fs";
import Note from "./components/Note";
import HomeScreen from "./components/HomeScreen";
import styles from "./assets/styles";
import NewNote from "./components/NewNote";

const Stack = createStackNavigator();

const App = () => {
  const isDarkMode = useColorScheme() === "dark";

  const [notes, setNotes] = useState([]);
  useEffect(() => {
    RNFS.readDir(DIR).then(result => {
      let newResult = result.map(value => ({ ...value, checked: false }));
      setNotes(newResult);
      console.log("appjs refresh");
    }).catch(e => alert("An error occurred reading directory!"));


  }, []);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="notes">
        <Stack.Screen name="notes" options={{ title: "Notes", headerStyle: styles.homeScreenHeader }}>{props =>
          <HomeScreen {...props} notes={notes} />}</Stack.Screen>
        <Stack.Screen name="note" options={{ title: "", headerStyle: styles.homeScreenHeader }} component={Note} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
