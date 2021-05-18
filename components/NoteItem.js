import React, { useEffect, useState } from "react";
import {  Pressable,  ToastAndroid,  Text,  Modal,  useColorScheme,  View,  TouchableOpacity} from "react-native";
import RNFS from "react-native-fs";
import CheckBox from "@react-native-community/checkbox";
import styles from "../assets/styles";

const NoteItem = (props) => {
  const [prevText, setPrevText] = useState("");
  const [noteCheck, setNoteCheck] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    RNFS.readFile(props.note.path, "utf8").then(res => setPrevText(res)).catch(e => {
      alert("An error occured reading files!");
      props.navigation.navigate("notes");
    });
console.log('noteitem refresh')
  }, []);

  const NotePrev = (props) => {
    return (
      <React.Fragment>
        <View style={styles.noteItem}>
          <Text style={styles.noteItemText} numberOfLines={3} ellipsizeMode="tail">{trunc(prevText)}</Text>
          {/* <CheckBox disabled={false} value={noteCheck} /> */}
        </View>
      </React.Fragment>
    );
  };


  const trunc = str => {
    return str;
  };

  const pressHandle = () => {
    props.navigation.navigate('note',{note: props.note});
  };

  const longPressHandle = () => {
    setModalVisible(true);
  };

  const deleteHandle = () => {
    RNFS.unlink(props.note.path).then(() => {
      setModalVisible(false);
      ToastAndroid.show("Note deleted successfully!", ToastAndroid.SHORT);
      props.navigation.navigate('notes',{refresh: String(new Date())});
    }).catch(e => alert("Error deleting the note!"));
  };

  //const handleNoteItemPress=
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
        onDismiss={() => setModalVisible(false)}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <TouchableOpacity activeOpacity={1} onPressOut={() => setModalVisible(false)} style={styles.container}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Are you sure to delete this note?</Text>
              <View>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={deleteHandle}
                >
                  <Text style={styles.textStyle}>YES</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>NO</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
      <Pressable onPress={pressHandle} onLongPress={longPressHandle}>
        <NotePrev />
      </Pressable>
    </View>
  );

};
export default NoteItem;
