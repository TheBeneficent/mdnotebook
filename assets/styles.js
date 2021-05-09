import {StyleSheet, Dimensions} from 'react-native';
const vw = Dimensions.get('window').width/100;
const vh = Dimensions.get('window').height/100;
const styles = StyleSheet.create({
    sectionContainer: {
      marginTop: 32,
      paddingHorizontal: 24,
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: "600",
    },
    sectionDescription: {
      marginTop: 8,
      fontSize: 18,
      fontWeight: "400",
    },
    highlight: {
      fontWeight: "700",
    },
    homeScreen:{
      backgroundColor: 'rgba(0, 200, 245, 0.2)',
    },
    homeScreenHeader:{
      backgroundColor: 'rgba(0, 200, 245, 0.7)',
    },
    note:{
      flex: 1,
      backgroundColor: 'rgba(0, 200, 245, 0.2)',
    },
    webView: {
      marginTop: 20, 
      width: 100*vw, 
      height: 100*vh
    },
    noteInput:{
      flex: 1,
      justifyContent: 'flex-start',
      textAlignVertical: 'top',
      fontSize: 18
    },
    noteItem: {
      display: 'flex',
      flexDirection: 'row',
      margin: 3,
      paddingHorizontal: 1,
      paddingVertical: 5,
      borderWidth: 1,
      borderRadius: 7,
      height: 80,
      backgroundColor: 'rgba(0, 200, 245, 0.3)'
    },
    noteItemText: {
      margin: 5,

    },
    deleteIcon: {
      color: '#f70727',
      backgroundColor: 'rgba(0, 200, 245, 0)'
    },
    homeHeaderBtnCont: {
      flexDirection: 'row',
      marginVertical: 'auto',
      marginHorizontal: 15,
    },
    addNewBtn: {
      backgroundColor: 'rgba(0, 200, 245, 0)',
      paddingHorizontal: 20,
      paddingVertical: 10,
    },
    addNewBtnText:{
      textAlign: 'center',
      textAlignVertical: 'center',
      fontSize: 22,

    },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    }
  });

  export default styles;