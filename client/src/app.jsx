import React from 'react'
import { Container } from '@mui/material';
import Home from './components/home/home';
import Navbar from './components/navbar/navbar';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Auth from './components/Auth/Auth';
import PostDetails from './components/post-details/post-details';

const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'))
  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <Navbar />
        <Routes>
          <Route path='/' element={<Navigate to="/posts"/>} />
          <Route path='/posts' element={<Home/>}/>
          <Route path='/posts/search' element={<Home/>}/>
          <Route path='/posts/:id' element={<PostDetails/>}/>
          <Route path='/auth' element={!user ? <Auth /> : <Navigate replace to='/posts'/>} />
        </Routes>
      </Container>
    </BrowserRouter>
  )
}

export default App