import React from 'react';
import { Button, Pressable } from 'react-native';
import NoteItem from '../components/NoteItem';
import { DIR } from '../constants/constants';
import RNFS from 'react-native-fs';
import Navigation from 'react-native-navigation';

const NewBtn = props => {
    const noteName = newName('note-');
    const path = DIR + `/${noteName}.md`;
    const handleNewBtn=()=>{
        RNFS.writeFile(path, '', 'utf8').then(success => Navigation.push(props.componentId,{
            component: {
              name:'NewNote',
              options:{
                topBar:{
                  title:{
                    name:''
                  }
                }
              },
              passProps:{
                note: props.note
              }
            }
          })).catch(e => alert('Problem creating or loading the note!'));
    }
    
    return <Button title='+' onPress={handleNewBtn} style={styles.addNewBtn} />
}
export default NewBtn;