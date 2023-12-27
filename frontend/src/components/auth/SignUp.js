import { useForm } from "react-hook-form";

import { Link } from "react-router-dom";

import useImagePreview from "../../hooks/useImagePreview";
import useFadeInEffect from "../../hooks/useFadeInEffect";

import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";

import LockOpenIcon from "@mui/icons-material/LockOpen";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

export default function SignUp({ users }) {
  const isLoaded = useFadeInEffect();

  const { preview, onSelectFile } = useImagePreview();

  const { register, handleSubmit, formState } = useForm({
    mode: "all",
  });

  const { errors } = formState;

  const handleFormSubmit = (data) => {
    // check if email already exists in the array, and if it does - show message that user already exists.
    // if all data is ok, push new user to the users array.
    console.log(data);
  };

  return (
    <Fade in={isLoaded} timeout={{ enter: 500 }}>
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
          <Avatar sx={{ margin: 1, bgcolor: "primary.main" }}>
            <LockOpenIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(handleFormSubmit)}
            marginTop={3}
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
                  {...register("lastName", {
                    required: "last name is required",
                  })}
                  error={!!errors.lastName}
                  helperText={errors.lastName?.message}
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
                  startIcon={<CloudUploadIcon />}
                  sx={{
                    textTransform: "none",
                    marginTop: 6.6,
                    marginBottom: 6.6,
                  }}
                >
                  Upload Profile Picture
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
                    width: 140,
                    height: 140,
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
              sx={{ marginTop: 2, marginBottom: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login" variant="body2">
                  Already have an account? Log in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Fade>
  );
}
