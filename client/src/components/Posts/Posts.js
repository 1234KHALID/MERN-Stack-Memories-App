import React from 'react';
import { useSelector } from 'react-redux';
import Post from './Post/Post';
import { Grid, CircularProgress } from '@mui/material';

const Posts = ({ setCurrentId }) => {
  const posts = useSelector(state => state.posts);
  return (
    !posts.length ?
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>  <CircularProgress /></div> : (
        <Grid
          container
          alignItems='stretch'
          spacing={3}
          sx={{
            display: "flex",
            alignItems: 'center'
          }}
        >
          {
            posts?.map((post) => (
              <Grid key={post._id} item xs={12} sm={6} md={6}>
                <Post post={post} setCurrentId={setCurrentId} />
              </Grid>
            ))
          }

        </Grid>
      )
  )
}

export default Posts