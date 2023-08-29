import React, { useEffect, useState } from 'react'
import { AppBar, Container, Grid, Grow, Typography } from '@mui/material';
import memories from './images/memories.png';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import { useDispatch } from 'react-redux';
import { getPosts } from './actions/posts';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Auth from './components/Auth/Auth';
const App = () => {
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);
  return (
    <BrowserRouter>
      <Container maxWidth="lg">
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/auth' element={<Auth />} />
        </Routes>
      </Container>
    </BrowserRouter>
  )
}

export default App