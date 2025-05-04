import React from 'react';
import { useSelector } from 'react-redux';
import Post from './post/post';
import { Grid, CircularProgress } from '@mui/material';

const Posts = ({ setCurrentId }) => {
  const posts = useSelector((state) => state.posts);
  return !posts.length ? (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <CircularProgress />
    </div>
  ) : (
    <Grid container alignItems="stretch" spacing={3}>
      {posts?.map((post) => (
        <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
          <Post post={post} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
