import React, { useState } from "react";

import { useForm } from "react-hook-form";
import db from "../utils/firebase";
import { updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { signup, upload } from "../utils/firebase";
import { Link, useNavigate } from "react-router-dom";

import useImagePreview from "../hooks/useImagePreview";
import useFadeInEffect from "../hooks/useFadeInEffect";

import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import MuiLink from "@mui/material/Link";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Collapse from "@mui/material/Collapse";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import CssBaseline from "@mui/material/CssBaseline";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

export default function SignUp() {
  const navigate = useNavigate();
  const isComponentLoaded = useFadeInEffect();
  const { preview, onSelectFile } = useImagePreview();

  const [photo, setPhoto] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const { register, handleSubmit, formState } = useForm({
    mode: "all",
  });

  const { errors } = formState;

  const handleFormSubmit = async (data) => {
    try {
      const userInfo = await signup(data.email, data.password);
      const { uid } = userInfo.user;
      let imageUrl = "";
      if (photo) {
        imageUrl = await upload(photo, userInfo.user, setIsLoading);
      }

      const userDocRef = doc(db, "users", uid);
      await setDoc(
        userDocRef,
        {
          firstName: data.firstName,
          lastName: data.lastName,
          profilePicture: imageUrl,
        },
        { merge: true }
      );

      await updateProfile(userInfo.user, {
        displayName: `${data.firstName} ${data.lastName}`,
        photoURL: imageUrl,
      });
      navigate("/");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setAlertMessage("email is already in use, try to log-in instead");
        setIsAlertOpen(true);
      }
      setAlertMessage(error.code);
      setIsAlertOpen(true);
    }
  };

  const handleAlertClose = () => {
    setIsAlertOpen(false);
  };

  const handleImageChange = (e) => {
    onSelectFile(e);
    const selectedFile = e.target.files[0];
    setPhoto(selectedFile);
  };

  return (
    <Fade in={isComponentLoaded} timeout={{ enter: 500 }}>
      <Container component="main" maxWidth="xs">
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
                  error={formState.isSubmitted && !!errors.firstName}
                  helperText={
                    formState.isSubmitted && errors.firstName?.message
                  }
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
                  error={formState.isSubmitted && !!errors.lastName}
                  helperText={formState.isSubmitted && errors.lastName?.message}
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
                  error={formState.isSubmitted && !!errors.email}
                  helperText={formState.isSubmitted && errors.email?.message}
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
                  error={formState.isSubmitted && !!errors.password}
                  helperText={formState.isSubmitted && errors.password?.message}
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
                    marginTop: 5,
                    marginBottom: 5,
                  }}
                >
                  Upload Profile Picture
                  <input
                    id="image"
                    name="image"
                    type="file"
                    placeholder="image"
                    accept=".png, .jpg, .jpeg"
                    {...register("image")}
                    onChange={handleImageChange}
                    hidden
                  />
                </Button>
                <Avatar
                  sx={{
                    width: 120,
                    height: 120,
                    bgcolor: "text.secondary",
                  }}
                  src={preview}
                ></Avatar>
              </Grid>
            </Grid>
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
              fullWidth
              type="submit"
              variant="contained"
              disabled={isLoading}
              sx={{ marginTop: 2, marginBottom: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <MuiLink component={Link} to="/login" variant="body2">
                  Already have an account? Log in
                </MuiLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Fade>
  );
}
