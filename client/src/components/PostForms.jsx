import React, { useState } from 'react';
import {
  TextField, Button, Card, CardMedia, Grid,
} from '@mui/material';
import axios from 'axios';

function PostForms({ animal }) {
  const [message, setMessage] = useState('');
  const [title, setTitle] = useState('');
  const [image, setImage] = useState({});
  const [imageUrl, setImageUrl] = useState('');
  // state from feed component
  let signedUrl = '';

  return (
    <Grid
      spacing={2}
      xs={6}
      sx={{ mb: '20px' }}
      container
      component="form"
      id="post-form"
      onSubmit={(e) => {
			  e.preventDefault();
			  return image.name
			    ? axios
			      .post('/imageUrl', {
			        filename: image.name,
			        filetype: image.type,
			      })
			      .then((result) => {
			        signedUrl = result.data;

			        const options = {
			          headers: {
			            'Content-Type': image.type,
			          },
			        };

			        return axios.put(signedUrl, image, options);
			      })
			      .then((result) => axios.post('/adoptionMessage', {
			          post: {
			            title,
			            message,
			            image: image.name,
			            imageType: image.type,
			            _id: animal._id,
			          },
			        }))
			      .then(() => {
			        setTitle('');
			        setMessage('');
			        setImage({});
			        document.getElementById('post-form').reset();
			      })
			      .catch((err) => {
			        console.error(err);
			      })
			    : axios
			      .post('/adoptionMessage', {
			        post: {
			          title,
			          message,
			          image: image.name,
			          imageType: image.type,
			          _id: animal._id,
			        },
			      })
			      .then(() => {
			        setTitle('');
			        setMessage('');
			        setImage({});
			        setImageUrl('');
			        document.getElementById('post-form').reset();
			      })
			      .catch((err) => {
			        console.error(err);
			      });
      }}
    >
      <Grid item xs={12}>
        <TextField
          label="Title"
          variant="standard"
          multiline
          maxRows={2}
          id="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          id="message"
          label="Message"
          variant="standard"
          multiline
          maxRows={5}
          minRows={3}
          mb={2}
          onChange={(e) => setMessage(e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <label htmlFor="image-upload">
          <input
            accept="image/*"
            id="image-upload"
            multiple={false}
            type="file"
            style={{ display: 'none' }}
            onChange={(e) => {
						  setImageUrl(URL.createObjectURL(e.target.files[0]));
						  setImage(e.target.files[0]);
            }}
          />
          <Button variant="outlined" component="span">
            Upload Image
          </Button>
        </label>
      </Grid>
      <Card>
        <CardMedia component="img" image={imageUrl} alt="" />
      </Card>

      <Button
        variant="contained"
        mt={2}
        sx={{ display: 'inline-block', mx: 'auto', mt: '10px' }}
        type="submit"
      >
        Submit
      </Button>
    </Grid>
  );
}

export default PostForms;
