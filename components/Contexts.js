import React from 'react';

const NotesContext = React.createContext([]);
const NotePathContext=React.createContext('');
const NotesProvider=NotesContext.Provider;
const NotesConsumer=NotesContext.Consumer;
const NotePathProvider=NotePathContext.Provider;
const NotePathConsumer=NotePathContext.Consumer;

export {NotesProvider, NotesConsumer, NotePathProvider, NotePathConsumer};