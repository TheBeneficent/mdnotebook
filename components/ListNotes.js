import { View } from "react-native";
import NoteItem from "./NoteItem";
import React from "react";

const ListNotes = (props) => {
  return (<View>
    {props.notes.map((value, index) => {
      if (value.isFile())
        return <NoteItem key={index} note={value} navigation={props.navigation} />;
    })}</View>);
}
export default ListNotes;
