import React, { useEffect, useState } from 'react'
import { AppBar, Typography, Toolbar, Avatar, Button } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

import decode from 'jwt-decode';
import * as actionType from '../../constants/actionType';
import memories from '../../images/memories.png';
import { useDispatch } from 'react-redux';
const Navbar = () => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('profile'))
  );
  const dispatch = useDispatch();
  const location = useLocation();
  // const history = useHistory();

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });
    // history.push('/auth');
    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedtoken = decode(token);

      if (decodedtoken.exp * 1000 < new Date().getTime()) {
        logout();
      }
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);

  return (
    <AppBar sx={{
      borderRadius: 15,
      margin: '30px 0',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px 50px',
    }} position='static' color='inherit'>
      <div style={{
        display: 'flex',
        alignItems: 'center',
      }}>
        <Typography component={Link} to='/'
          variant='h2'
          align='center'
          sx={{
            color: 'rgba(0,183,255, 1)',
            textDecoration: 'none',
          }}
          xs={{ display: 'none' }}
        >
          Memories
        </Typography>
        <img style={{ marginLeft: '15px' }} src={memories} alt='icon' height='60' />
      </div>
      <Toolbar sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        width: '400px',
      }}
      >
        {user?.result ? (
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '400px',
          }}
          >
            <Avatar sx={{
              backgroundColor: "deepskyblue",
              color: 'white'
            }} alt={user?.result.name} src={user?.result.imageUrl}>
              {user?.result.name.charAt(0)}
            </Avatar>
            <Typography sx={{
              display: 'flex',
              alignItems: 'center',
            }} variant='h6'>
              {user?.result.name}
            </Typography>
            <Button variant='contained' onClick={logout}>
              Logout
            </Button>
          </div>
        ) : (
          <Button variant='contained' color='primary' component={Link} to='/auth'>
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Navbar