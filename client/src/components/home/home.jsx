import React, { useEffect, useState } from 'react';
import { Container, Grid, Grow, Pagination, Paper } from '@mui/material';
import { useDispatch } from 'react-redux';
import Posts from '../posts/posts';
import Form from '../form/form';
import { getPosts } from '../../actions/posts';
import Paginate from '../pagination /pagination';

const Home = () => {
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);
  return (
    <Grow in>
      <Container>
        <Grid container justifyContent="space-between" alignItems="stretch" spacing={3}>
          <Grid item xs={12} sm={7}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            <Paper elevation={6}>
              <Paginate />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
