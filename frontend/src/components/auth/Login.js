import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth-context";
import useFadeInEffect from "../../hooks/useFadeInEffect";

import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
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

export default function Login({ users }) {
  const isLoaded = useFadeInEffect();
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const navigate = useNavigate();

  const { register, handleSubmit, formState } = useForm({
    mode: "all",
  });

  const { errors } = formState;
  const { login } = useAuth();

  const handleFormSubmit = (data) => {
    console.log(data);

    // Find user by email, which is unique
    const user = users.find((user) => user.email === data.email);

    // Incorrect email (not in the database)
    if (!user) {
      setAlertMessage("Email is incorrect, try again");
      setIsAlertOpen(true);
      return;
    }

    // Correct email, incorrect password
    if (user.password !== data.password) {
      setAlertMessage("Password is incorrect, try again");
      setIsAlertOpen(true);
      return;
    }

    const id = user.id;
    const firstName = user.firstName;
    const lastName = user.lastName;
    const profilePicture = user.profilePicture;

    // Send user information to the login function in useAuth
    login({ ...data, id, profilePicture, firstName, lastName });
    navigate("/");
  };

  const handleAlertClose = () => {
    setIsAlertOpen(false);
  };

  return (
    <Fade in={isLoaded} timeout={{ enter: 500 }}>
      <Container maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ margin: 1, bgcolor: "primary.main" }}>
            <LockOpenIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Log in
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(handleFormSubmit)}
            marginTop={1}
          >
            <TextField
              id="email"
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
              {...register("email", {
                required: "email is required",
                validate: {
                  matchPattern: (v) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                    "please enter a valid email address",
                },
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
              fullWidth
            />
            <TextField
              margin="normal"
              id="password"
              name="password"
              label="Password"
              type="password"
              autoComplete="password"
              size="small"
              {...register("password", {
                required: "password is required",
                validate: {
                  minLength: (v) =>
                    v.length >= 6 ||
                    "password should be at least 6 characters long",
                },
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
              fullWidth
            />
            <Collapse in={isAlertOpen}>
              <Alert
                severity="error"
                action={
                  <IconButton
                    aria-label="close"
                    size="small"
                    onClick={handleAlertClose}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
                sx={{ mt: 2 }}
              >
                {alertMessage}
              </Alert>
            </Collapse>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ marginTop: 3, marginBottom: 2 }}
            >
              log In
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/signup" variant="body2">
                  Don't have an account? Sign up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Fade>
  );
}
