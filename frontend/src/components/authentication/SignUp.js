import * as React from "react";
import { useEffect, useState } from "react";
import "./SignUp.css";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
// import { createTheme, ThemeProvider } from "@mui/material/styles";

import { useForm, SubmitHandler } from "react-hook-form";

export default function SignUp() {
  const { register, handleSubmit, formState } = useForm({
    mode: "all",
  });

  const { errors } = formState;
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   console.log({
  //     email: data.get("email"),
  //     password: data.get("password"),
  //   });
  // };

  const onSubmit = (data) => {
    console.log(data);
  };

  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    setSelectedFile(e.target.files[0]);
  };

  return (
    // <ThemeProvider theme={defaultTheme}>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 8,
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                id="firstName"
                name="firstName"
                label="First Name"
                size="small"
                autoComplete="given-name"
                {...register("firstName", {
                  required: "First Name is required",
                })}
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="lastName"
                name="lastName"
                label="Last Name"
                size="small"
                autoComplete="family-name"
                {...register("lastName", { required: "Last Name is required" })}
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="birthday"
                name="birthday"
                label="Birthday"
                type="date"
                size="small"
                {...register("birthday", {
                  required: "Date of Birth is required",
                })}
                error={!!errors.birthday}
                helperText={errors.birthday?.message}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="email"
                name="email"
                label="Email Address"
                type="email"
                size="small"
                autoComplete="email"
                {...register("email", {
                  required: "Email is required",
                  validate: {
                    matchPattern: (v) =>
                      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                      "Please enter a valid email address",
                  },
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="password"
                name="password"
                label="Password"
                type="password"
                autoComplete="new-password"
                size="small"
                {...register("password", {
                  required: "Password is required",
                  validate: {
                    minLength: (v) =>
                      v.length >= 6 ||
                      "Password should have at least 6 characters",
                  },
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
                fullWidth
              />
            </Grid>
            <Grid container item justifyContent="space-between">
              <Button
                variant="outlined"
                component="label"
                sx={{
                  textTransform: "none",
                  marginTop: 6,
                  marginBottom: 6,
                }}
              >
                Choose Profile Picture
                <input
                  id="image"
                  name="image"
                  type="file"
                  accept=".png, .jpg, .jpeg"
                  onChange={onSelectFile}
                  // {...register("image")}
                  hidden
                />
              </Button>
              <Avatar
                sx={{
                  width: 125,
                  height: 125,
                  bgcolor: "rgba(25,118,210,0.57)",
                }}
                src={preview}
              ></Avatar>
            </Grid>
          </Grid>
          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/SignIn" variant="body2">
                Already have an account? Sign In
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
    // </ThemeProvider>
  );
}
