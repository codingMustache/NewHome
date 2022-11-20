import styled from 'styled-components';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Button, TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ChatEntry from './ChatEntry.jsx';

const Contain = styled(Container)`
	background-color: #eee3cb;
	padding: 1%;
	height: 40%;
	border-radius: 1%;
	border: 1px solid black;
	margin: auto;
	width: 50%;
`;

function Chatroom() {
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);

  const sendMsg = () => {
    if (text.length >= 1) {
      axios
        .post('/chat', { text })
        .then(() => setText(''))
        .catch((error) => console.log(error));
    }
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
    <Contain fixed>
      <div>
        <Typography variant="h2" align="center">
          Pet Chat
        </Typography>
        {messages.map((msg) => (
          <ChatEntry msg={msg} key={msg._id} />
        ))}
        <TextField
          fullWidth
          label="Chat"
          value={text}
          onChange={(e) => setText(e.target.value)}
          type="text"
        />
        <br />
        <br />
        <Button
          variant="contained"
          mt={2}
          sx={{ display: 'inline-block', margin: 'auto' }}
          type="submit"
          onClick={sendMsg}
        >
          Send
        </Button>
      </div>
    </Contain>
  );
}

export default Chatroom;
