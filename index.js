/**
 * @format
 */

 import { Navigation } from "react-native-navigation";
// import {AppRegistry} from 'react-native';
import App from './App';
// import {name as appName} from './app.json';
import HomeScreen from './components/HomeScreen';
import Note from './components/Note';
import NewNote from './components/NewNote';
import NewBtn from './components/NewBtn';
// AppRegistry.registerComponent(appName, () => App);

Navigation.registerComponent('Notes', () => HomeScreen);
Navigation.registerComponent('Note', () => Note);
Navigation.registerComponent('NewNote', () => NewNote);
Navigation.registerComponent('NewBtn', () => NewBtn);
Navigation.events().registerAppLaunchedListener(async () => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'Notes'
            }
          }
        ]
      }
    }
  });
});
