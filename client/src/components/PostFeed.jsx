import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Box, Typography, Grid } from '@mui/material';
import Post from './Post.jsx';
import Loading from './Loading.jsx';
import { UserContext } from '../UserContext.jsx';

function PostFeed() {
  const [posts, setPosts] = useState([]);
  const [rendered, setRendered] = useState(false);
  const { user } = useContext(UserContext);
  useEffect(() => {
    if (user) {
      axios
        .get(`/feed/posts/${user.id}`)
        .then(({ data: posts }) => {
          setPosts(posts.flat());
        })
        .then(() => {
          setRendered(true);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [rendered]);

  const updatePosts = () => {
    setTimeout(() => {
      axios
        .get(`/feed/posts${user.id}`)
        .then(({ data: posts }) => {
          setPosts(posts.flat());
          updatePosts();
        })
        .catch((err) => {
          console.error(err);
        });
    }, 6000000);
  };
  updatePosts();

  if (posts.length) {
    return (
      <Box>
        <Typography variant="h3">Adoption Stories</Typography>
        <Grid
          container
          xs={8}
          xl={8}
          direction="column"
          justifyContent="center"
          alignItems="center"
          rowSpacing={8}
        >
          {posts.map((post) => (
            <Grid item key={JSON.stringify(post)} xs={6} xl={6}>
              <Post post={post} />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }
  return <Loading />;
}
export default PostFeed;
