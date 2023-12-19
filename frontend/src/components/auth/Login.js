import * as React from "react";

import { useForm } from "react-hook-form";
import { useAuth } from "../../context/auth-context";

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

export default function Login({ users }) {
  const navigate = useNavigate();

  const { register, handleSubmit, formState } = useForm({
    mode: "all",
  });

  const { errors } = formState;
  const { login } = useAuth();

  const onSubmit = (data) => {
    console.log(data);

    // Check if the users array is defined and iterable
    // if (!users) {
    //   console.log("Users array is missing or not iterable");
    //   return alert("An error occurred, please try again later");
    // }

    // Find user by email, which is unique
    const user = users.find((user) => user.email === data.email);

    // Incorrect email (not in the database)
    if (!user) {
      console.log("Email is incorrect");
      return alert("Email is incorrect, try again");
    }

    // Correct email, incorrect password
    if (user.password !== data.password) {
      console.log("Password is incorrect");
      return alert("Password is incorrect, try again");
    }

    // Correct email, correct password
    console.log("Logged in successfully");

    // Check if the user has a profileImage property
    const id = user.id;
    const firstName = user.firstName;
    const lastName = user.lastName;
    const profilePicture = user.profilePicture;

    // Send the user information (including profileImage) to the login function
    login({ ...data, id, profilePicture, firstName, lastName });

    // Navigate to the desired page (e.g., '/')
    navigate("/");
  };

  return (
    <Container component="main" maxWidth="xs">
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
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log in
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 1 }}
        >
          <TextField
            id="email"
            name="email"
            label="Email Address"
            type="email"
            size="small"
            autoComplete="email"
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
                {"Don't have an account? Sign up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
