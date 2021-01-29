import React, { createContext, useReducer } from 'react';
import { chatReducer } from './chatReducer';

export const ChatContext = createContext();

const initialState = {
  uid: '',
  chatActivo: null, // uid del usuario al que quiero mandar mensajes
  usuarios: [], // todos los user de la db
  mensajes: [], // mensajes del chat seleccionado
};

const ChatProvider = ({ children }) => {
  const [chatState, dispatch] = useReducer(chatReducer, initialState);

  return (
    <ChatContext.Provider
      value={{
        chatState,
        dispatch,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;
