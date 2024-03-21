import React, { useState } from "react";

import { useForm } from "react-hook-form";
import { login } from "../utils/firebase";
import { Link, useNavigate, useLocation } from "react-router-dom";

import useFadeInEffect from "../hooks/useFadeInEffect";

import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import MuiLink from "@mui/material/Link";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import CssBaseline from "@mui/material/CssBaseline";
import LockOpenIcon from "@mui/icons-material/LockOpen";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";
  const isComponentLoaded = useFadeInEffect();

  const [isLoading, setIsLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const { register, handleSubmit, formState } = useForm({
    mode: "all",
  });

  const { errors } = formState;

  const handleFormSubmit = async (data) => {
    setIsLoading(true);
    try {
      await login(data.email, data.password);
      navigate(from);
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          setAlertMessage("password is incorrect, try again");
          break;
        case "auth/user-not-found":
          setAlertMessage("email is incorrect, try again");
          break;
        case "auth/invalid-credential":
          setAlertMessage("email or password is incorrect, try again");
          break;
        case "auth/too-many-requests":
          setAlertMessage("too many requests, try again later");
          break;
        case "auth/network-request-failed":
          setAlertMessage("network error, try again later");
          break;
        default:
          setAlertMessage(error.code);
      }
      setIsAlertOpen(true);
    }
    setIsLoading(false);
  };

  const handleAlertClose = () => {
    setIsAlertOpen(false);
  };

  return (
    <Fade in={isComponentLoaded} timeout={{ enter: 500 }}>
      <Container maxWidth="xs">
        <CssBaseline />
        <Box
          marginTop={4}
          marginBottom={4}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
        >
          <Avatar
            sx={{
              margin: 1,
              color: "text.icon",
              backgroundColor: "primary.main",
            }}
          >
            <LockOpenIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Log in
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(handleFormSubmit)}
            marginTop={3}
          >
            <TextField
              name="email"
              label="Email Address"
              type="email"
              size="small"
              autoComplete="email"
              inputProps={{
                form: {
                  autocomplete: "off",
                },
              }}
              defaultValue="test@gmail.com"
              {...register("email", {
                required: "email is required",
                validate: {
                  matchPattern: (v) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                    "please enter a valid email address",
                },
              })}
              error={formState.isSubmitted && !!errors.email}
              helperText={formState.isSubmitted && errors.email?.message}
              fullWidth
            />
            <TextField
              margin="normal"
              name="password"
              label="Password"
              type="password"
              autoComplete="password"
              size="small"
              defaultValue="123456"
              {...register("password", {
                required: "password is required",
                validate: {
                  minLength: (v) =>
                    v.length >= 6 ||
                    "password should be at least 6 characters long",
                },
              })}
              error={formState.isSubmitted && !!errors.password}
              helperText={formState.isSubmitted && errors.password?.message}
              fullWidth
            />
            <Collapse in={isAlertOpen}>
              <Alert
                severity="error"
                variant="filled"
                action={
                  <IconButton
                    aria-label="close"
                    size="small"
                    onClick={handleAlertClose}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
                sx={{
                  marginTop: 2,
                  color: "white",
                  backgroundColor: "error.main",
                }}
              >
                {alertMessage}
              </Alert>
            </Collapse>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ marginTop: 3, marginBottom: 2 }}
              disabled={isLoading}
            >
              Log In
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <MuiLink component={Link} to="/signup" variant="body2">
                  Don't have an account? Sign up
                </MuiLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Fade>
  );
}
