// React, Context, useState, useEffect
// material ui box/container, card?
import React, { useState, useEffect, useContext } from 'react';
import {
  Box,
  Container,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  Typography,
} from '@mui/material';
import { UserContext } from '../UserContext.jsx';
import ListEntry from './SavedListEntry.jsx';

function PetList({ list }) {
  if (list === null) {
    return <div>Saved Pets go here</div>;
  }

  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {list.map((item) => (
        <span>
          <ListEntry key={`${item.petId}`} pet={item} />
          <Divider variant="inset" component="li" />
        </span>
      ))}
    </List>
  );
}

export default PetList;

//  <ListItem alignItems="flex-start">
//         <ListItemAvatar>
//           <Avatar alt="" src="/static/images/avatar/1.jpg" />
//         </ListItemAvatar>
//         <ListItemText
//           primary="Brunch this weekend?"
//           secondary={
//             <React.Fragment>
//               <Typography
//                 sx={{ display: 'inline' }}
//                 component="span"
//                 variant="body2"
//                 color="text.primary"
//               >
//                 Ali Connors
//               </Typography>
//               {" — I'll be in your neighborhood doing errands this…"}
//             </React.Fragment>
//           }
//         />
//       </ListItem>
//       <Divider variant="inset" component="li" />
