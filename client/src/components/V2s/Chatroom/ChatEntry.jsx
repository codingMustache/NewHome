import styled from 'styled-components';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Contain = styled(Container)`
	background-color: #5d473d;
	box-shadow: 5px 3px #ac9362;
`;

function ChatEntry({ msg }) {
  const [user, setUser] = useState();

  const getUser = () => {
    // console.log('/usermsg', msg.from);
    axios
      .get(`/user/findUser${msg.from}`)
      .then((data) => setUser(data.data[0]))
      .catch((error) => console.log(error));
  };

  useEffect(getUser, []);

  return (
    <Contain fixed>
      <div>
        <Typography color="#EEE3CB" variant="h6" align="left">
          {user ? (
            <p>
              <b>{user.firstName}</b>
              :&nbsp;
              {msg.text}
            </p>
          ) : (
            <> </>
          )}
        </Typography>
      </div>
    </Contain>
  );
}

export default ChatEntry;
