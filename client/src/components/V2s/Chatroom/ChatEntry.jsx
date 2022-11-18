import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
    <div>
      {msg.text}
      <div>{user ? <p>{user.firstName}</p> : <> </>}</div>
    </div>
  );
}

export default ChatEntry;
