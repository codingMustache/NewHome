import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ChatEntry from './ChatEntry.jsx';

function Chatroom() {
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);

  const sendMsg = () => {
    axios
      .post('/chat', { text })
      .then(() => setText(''))
      .catch((error) => console.log(error));
  };

  const getMsg = () => {
    axios
      .get('/chat')
      .then((data) => setMessages(data.data.reverse()))
      .catch((error) => console.log(error));
    setTimeout(getMsg, 200);
  };

  useEffect(getMsg, []);

  return (
    <div>
      <h2>Chat</h2>
      {messages.map((msg) => (
        <ChatEntry msg={msg} key={msg._id} />
      ))}
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        type="text"
      />
      <button type="button" onClick={sendMsg}>
        Send
      </button>
    </div>
  );
}

export default Chatroom;
