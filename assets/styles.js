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

    }
  });

  export default styles;