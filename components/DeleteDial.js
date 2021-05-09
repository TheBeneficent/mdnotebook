import {View, Modal, Pressable, Text} from 'react-native';
import React from 'react';
import styles from '../assets/styles';
const DeleteDial=(props)=>{
    const [modalVisible, setModalVisible] = React.useState(props.visible);
    // React.useEffect(()=>{setModalVisible(props.visible)},[props.visible]);
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Are you sure to delete this note?</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
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
      </Modal>
  );
}
export default DeleteDial;