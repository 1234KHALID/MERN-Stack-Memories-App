import React, { useEffect, useState, useCallback } from 'react';
import { AppBar, Typography, Toolbar, Avatar, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import * as actionType from '../../constants/actionType';
import memoriesLogo from '../../images/memories-logo.png';
import memoriesText from '../../images/memories-text.png';

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = useCallback(() => {
    dispatch({ type: actionType.LOGOUT });
    navigate('/auth');
    setUser(null);
  }, [dispatch, navigate]);

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedtoken = decode(token);

      if (decodedtoken.exp * 1000 < new Date().getTime()) {
        logout();
      }
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [logout, user?.token]);

  return (
    <AppBar
      sx={{
        borderRadius: '10px',
        margin: '30px 0',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 50px',
      }}
      position="static"
      color="inherit"
    >
      <Link
        to="/"
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <img src={memoriesLogo} alt="icon" height="45px" />
        <img style={{ marginLeft: '15px' }} src={memoriesText} alt="icon" height="40px" />
      </Link>
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          width: '400px',
        }}
      >
        {user?.result ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '400px',
            }}
          >
            <Avatar
              sx={{
                backgroundColor: 'deepskyblue',
                color: 'white',
              }}
              alt={user?.result.name}
              src={user?.result.imageUrl}
            >
              {user?.result.name.charAt(0)}
            </Avatar>
            <Typography
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
              variant="h6"
            >
              {user?.result.name}
            </Typography>
            <Button color="secondary" variant="contained" onClick={logout}>
              Logout
            </Button>
          </div>
        ) : (
          <Button variant="contained" color="primary" component={Link} to="/auth">
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
