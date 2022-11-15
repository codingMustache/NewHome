// React, Context, useState, useEffect
// material ui box/container, card?
import React, { useState, useEffect, useContext } from 'react';
import { List } from '@mui/material';
import { UserContext } from '../UserContext.jsx';
import ListEntry from './ListEntry.jsx';

function PetList({ list }) {
  if (list === null) {
    return <div>Saved Pets go here</div>;
  }
  /// fix key render here
  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {list.map((item) => (
        <ListEntry key={item._id} pet={item} />
      ))}
    </List>
  );
}

export default PetList;
