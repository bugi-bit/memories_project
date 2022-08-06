import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import { GoogleLogin } from "react-google-login";
import Icon from "./icon";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
//login
import jwt_decode from "jwt-decode";
import useStyles from "./styles";
import Input from "./Input";
import { signin, signup } from "../../actions/auth";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = () => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleShowPassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      dispatch(signup(formData, navigate));
    } else {
      dispatch(signin(formData, navigate));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: [e.target.value] });
  };

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };
  const googleSuccess = async (res) => {
    console.log("Encoded Jwt ID TOken :" + res.credential);
    const userObject = jwt_decode(res.credential);
    console.log(userObject);
    setIsSignup(userObject);
    const result = userObject;
    const token = res?.credential;

    try {
      dispatch({ type: "AUTH", data: { result, token } });

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  const googleError = (error) => {
    console.log(error);
    console.log("Google Sign In was unsuccessful. Try Again Later");
  };

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        "687448181373-19bp75ccfcganhckcm3brek3mkp7tcu4.apps.googleusercontent.com",
      callback: googleSuccess,
    });
    google.accounts.id.renderButton(document.getElementById("g_id_onload"), {
      theme: "outline",
      size: "large",
    });
  }, []);
  // //login
  // const handleCallbackResponse = (response) => {
  //   console.log("Encoded Jwt ID TOken :" + response.credential);
  //   const userObject = jwt_decode(response.credential);
  //   console.log(userObject);
  //   console.log("Full Name: " + userObject.name);
  // };
  // useEffect(() => {
  //   /* global google */
  //   google.accounts.id.initialize({
  //     client_id:
  //       "687448181373-19bp75ccfcganhckcm3brek3mkp7tcu4.apps.googleusercontent.com",
  //     callback: handleCallbackResponse,
  //   });
  //   google.accounts.id.renderButton(document.getElementById("g_id_onload"), {
  //     theme: "outline",
  //     size: "large",
  //   });
  // }, []);

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignup ? "Sign Up" : "Sign In"}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
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
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </Button>
          <Button
            className={classes.googleButton}
            variant="contained"
            fullWidth
            id="g_id_onload"
            color="primary"
            data-client_id="687448181373-19bp75ccfcganhckcm3brek3mkp7tcu4.apps.googleusercontent.com"
            data-login_uri="http://localhost:3000"
            data-cancel_on_tap_outside="false"
          ></Button>

          {/* <GoogleLogin
            clientId="687448181373-19bp75ccfcganhckcm3brek3mkp7tcu4.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button
                className={classes.googleButton}
                color="primary"
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
                variant="contained"
              >
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          /> */}
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup
                  ? "Already have an account? Sign In"
                  : "Don't have account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
