import React from 'react';

const NotesContext = React.createContext([]);
const NoteContext=React.createContext('');
const NoteItemContext=React.createContext({});
const NotesProvider=NotesContext.Provider;
const NotesConsumer=NotesContext.Consumer;
const NoteProvider=NoteContext.Provider;
const NoteConsumer=NoteContext.Consumer;
const NoteItemProvider=NoteItemContext.Provider;
const NoteItemConsumer=NoteItemContext.Consumer;

export {NotesProvider, NotesConsumer, NoteProvider, NoteConsumer, NoteItemProvider, NoteItemConsumer};