import React, { useState } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Input from "./Input";
import {
  Avatar,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { SignUp, SignIn } from "../../actions/auth.js";
import { useNavigate } from "react-router-dom";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { AUTH } from "../../constants/actionType";
import jwt_decode from "jwt-decode";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [form, setForm] = useState(initialState);
  const [isShow, setIsShow] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleShowPassword = () => setIsShow(!isShow);
  const switchMode = () => {
    setForm(initialState);
    setIsSignUp((prev) => !prev);
    setIsShow(false);
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const googleSuccess = async (res) => {
    const result = jwt_decode(res.credential);

    try {
      dispatch({ type: AUTH, data: { result } });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const googleError = (error) => {
    console.log(error);
    alert("Google Sign In was unsuccessful. Try again later");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignUp) {
      dispatch(SignUp(form, navigate));
      setForm(initialState);
    } else {
      dispatch(SignIn(form, navigate));
      setForm(initialState);
    }
  };
  return (
    <Container component="main" maxWidth="xs">
      <Paper
        elevation={3}
        sx={{
          marginTop: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "15px",
        }}
      >
        <Avatar
          sx={{
            margin: "2px",
            backgroundColor: "blue",
          }}
        >
          <LockOutlinedIcon />
        </Avatar>
        <Typography>{isSignUp ? "Sign UP" : "Sign In"}</Typography>
        <form
          onSubmit={handleSubmit}
          style={{
            width: "100%",
            marginTop: "15px",
          }}
        >
          <Grid container spacing={2}>
            {isSignUp && (
              <>
                <Input
                  name="firstName"
                  label="Firts Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={isShow ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignUp && (
              <Input
                name="confirmPassword"
                label="Confirm Password"
                handleChange={handleChange}
                type={isShow ? "text" : "password"}
                handleShowPassword={handleShowPassword}
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{
              margin: "15px 0 10px",
            }}
          >
            {isSignUp ? "Sign UP" : "Sign In"}
          </Button>
          <GoogleOAuthProvider
            fullWidth
            clientId="413826242377-g5oh7shopefp8pe3v0prms6sg6h713j2.apps.googleusercontent.com"
          >
            <GoogleLogin
              type="standard"
              theme="filled_blue"
              width="366px"
              text="Sign In With Google"
              useOneTap={true}
              onSuccess={googleSuccess}
              onError={googleError}
            />
          </GoogleOAuthProvider>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignUp
                  ? "Already have an account? Sign in"
                  : "Don't have an account ? Sign up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
