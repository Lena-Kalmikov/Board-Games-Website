import * as React from "react";

import useImagePreview from "../../hooks/useImagePreview";

import { useForm } from "react-hook-form";

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

export default function SignUp() {
  const { preview, onSelectFile } = useImagePreview();

  const { register, handleSubmit, formState } = useForm({
    mode: "all",
  });

  const { errors } = formState;

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 4,
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
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
                  required: "first name is required",
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
                {...register("lastName", { required: "last name is required" })}
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="birthday"
                name="birthday"
                label="Date of Birth"
                type="date"
                size="small"
                {...register("birthday", {
                  required: "date of birth is required",
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
                  {...register("image")}
                  onChange={onSelectFile}
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
              <Link href="/Login" variant="body2">
                Already have an account? Log in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
