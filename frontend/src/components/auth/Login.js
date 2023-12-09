import * as React from "react";

import { useForm } from "react-hook-form";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

export default function Login() {
  const { register, handleSubmit, formState } = useForm({
    mode: "all",
  });

  const { errors } = formState;

  const onSubmit = (data) => {
    // send form data to the server using fetchRequest
    // server should return if the user exists on not.
    console.log(data);
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
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
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
            margin="normal"
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            log In
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
