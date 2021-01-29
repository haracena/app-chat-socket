import React, { useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';
import { ChatContext } from '../context/chat/ChatContext';
import IncomingMessage from './IncomingMessage';
import OutgoingMessage from './OutgoingMessage';
import SendMessage from './SendMessage';

const Messages = () => {
  const { chatState } = useContext(ChatContext);
  const { auth } = useContext(AuthContext);

  return (
    <div className='mesgs'>
      <div id='messages' className='msg_history'>
        {chatState.mensajes.map((mensaje) =>
          mensaje.para === auth.uid ? (
            <IncomingMessage key={mensaje._id} msg={mensaje} />
          ) : (
            <OutgoingMessage key={mensaje._id} msg={mensaje} />
          )
        )}
      </div>

      <SendMessage />
    </div>
  );
};

export default Messages;
