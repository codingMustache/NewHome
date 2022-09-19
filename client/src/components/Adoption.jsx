import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  IconButton,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../UserContext.jsx';
// import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

function Adoption({ animalsData }) {
  // get rid of conditional rendering here and create a single card instance with dynamic data
  // this won't render until animals data is defined
  // navigate hook to render petview
  const {
    user, savedList, setSavedList, isClicked, setClick,
  } =		useContext(UserContext);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isThere, setThere] = useState(false);
  const navigate = useNavigate();

  // on click render individual petview
  const handleEntryClick = () => {
    console.log('clicked on', animalsData.name);
    // navigate tag to render petview
    return navigate('/petview', { state: { animalsData } });
  };

  const handleUnsave = (e) => {
    console.log('inside handleUnsave', e);

    // setClick(() => {
    //   const afterClicked = isClicked;
    //   afterClicked.unshift(animalsData.id);
    //   return afterClicked;
    // })
    setThere(false);

    axios
      .delete('/pet/savePet', {
        data: {
          userId: user.id,
          _id: animalsData._id,
        },
      })
      .then((data) => {
        console.log('inside unsave lol', data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleSavePet = (e) => {
    console.log('inside handleSavePet', animalsData._id);
    setClick(() => {
      const afterClicked = isClicked;
      afterClicked.push(animalsData._id);
      return afterClicked;
    });

    setThere(true);
    // check if user is logged in, and button id;
    if (!loggedIn) {
      // direct a user to log in to save/follow pets
      window.alert('Please sign up/login');
    } else {
      console.log(user);
      // axios request for favoriting a pet
      animalsData.userId = user.id;
      axios
        .post('/pet/savePet', {
          pet: animalsData,
        })
        .then((data) => {
          console.log('data from pet/savePet', data);
          axios
            .get(`/pet/savePet/${user.id}`)
            .then(({ data }) => {
              console.log('updated savedList from petview\n', data);
              setSavedList(data);
            })
            .catch((err) => {
              console.error('error updating pet list\n', err);
            });
        })
        .catch((err) => {
          console.error('error on /pet/savePet req', err);
        });
    }
  };

  useEffect(
    () => (user !== null ? setLoggedIn(true) : setLoggedIn(false)),

    [loggedIn],
  );
  useEffect(() => {
    if (savedList !== null) {
      savedList.forEach((savedPet) => {
        if (savedPet._id === animalsData._id) {
          setThere(true);
        }
      });
    }
  }, []);

  return (
    <Card raised sx={{ width: '40vw' }}>
      {(() => {
			  if (animalsData.photo) {
			    return <CardMedia component="img" image={animalsData.photo} alt="" />;
			  }
      })()}

      <CardContent style={{ backgroundColor: '#E3C770' }}>
        <Typography gutterBottom variant="h5" component="div">
          {animalsData.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {animalsData.description}
        </Typography>
      </CardContent>
      <CardActions style={{ backgroundColor: '#A64B2A' }}>
        <Button
          style={{ backgroundColor: '#FCFFE7', color: '#DEA057' }}
          size="small"
          id="viewpet"
          onClick={handleEntryClick}
        >
          view more
        </Button>
        {user ? (
				  isThere ? (
  <IconButton
    id="save"
    aria-label="add to favorites"
    onClick={(e) => {
							  handleUnsave(e);
    }}
  >
    <FavoriteIcon style={{ color: 'purple' }} size="small" />
  </IconButton>
				  ) : (
  <IconButton
    id="save"
    aria-label="add to favorites"
    onClick={(e) => {
							  // handleUnsave();
							  handleSavePet(e);
    }}
  >
    <FavoriteIcon style={{ color: '#DEA057' }} size="small" />
  </IconButton>
				  )
        ) : (
          <IconButton
            disabled="true"
            id="save"
            aria-label="add to favorites"
            onClick={(e) => {
						  // handleUnsave();
						  handleSavePet(e);
            }}
          >
            <FavoriteIcon style={{ color: '#DEA057' }} size="small" />
          </IconButton>
        )}
      </CardActions>
    </Card>
  );
}
Adoption.propTypes = {
  animalsData: PropTypes.object.isRequired,
};
export default Adoption;
/* <IconButton aria-label="add to favorites"
  style={{backgroundColor: "#FCFFE7", color: "#DEA057" }}
size="small" id="savepet"
onClick={handleSaveClick}>save for later</IconButton>
*/
//   const likeChanger = () => {
//       //const isLiked = isClicked.map((ele) => ele);
//      console.log('inside LikeChanger', isClicked)
//       if (isThere) {
//         return (
//           <IconButton
//           id="save"
//           aria-label="add to favorites"
//           onClick={(e) => {
//                // handleUnsave lol
//            handleSavePet(e);
//           }}
//           >
//           <FavoriteIcon style={{ color: '#DEA057' }} size="small" />
//         </IconButton>
//       );
//     } else {
//       return (
//         <IconButton
//         id="save"
//         aria-label="add to favorites"
//         onClick={(e) => {
//           setThere(false);
//           //handleSavePet(e);
//         }}
//         >
//           <FavoriteIcon style={{ color: 'purple' }} size="small" />
//         </IconButton>
//       );
//     }
// };
