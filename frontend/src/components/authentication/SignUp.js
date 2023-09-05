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

// TODO remove, this demo shouldn't need to reset the theme.

// const defaultTheme = createTheme();

export default function SignUp() {
  // const [isEmailValid, setIsEmailValid] = useState(true);
  // const [emailHelperText, setEmailHelperText] = useState("");

  // const [isPasswordValid, setIsPasswordValid] = useState(true);
  // const [passwordHelperText, setPasswordHelperText] = useState("");

  // const [isFirstNameValid, setFirstNameValid] = useState(true);
  // const [firstNameHelperText, setFirstNameHelperText] = useState("");

  // const [isLastNameValid, setIsLastNameValid] = useState(true);
  // const [lastNameHelperText, setLastNameHelperText] = useState("");

  // const [isBirthdayValid, setIsBirthdayValid] = useState(true);
  // const [birthdayHelperText, setBirthdayHelperText] = useState("");

  // const checkEmailInput = (event) => {
  //   setIsEmailValid(true);
  //   setEmailHelperText("");
  //   let validRegex =
  //     /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  //   if (
  //     event.currentTarget.value === "" ||
  //     !event.currentTarget.value.match(validRegex)
  //   ) {
  //     setIsEmailValid(false);
  //     setEmailHelperText("Please enter a valid email address");
  //   } else {
  //     setIsEmailValid(true);
  //     setEmailHelperText("");
  //   }
  // };

  // const checkPasswordInput = (event) => {
  //   if (
  //     event.currentTarget.value.length === 0 ||
  //     event.currentTarget.value.length < 6
  //   ) {
  //     setIsPasswordValid(false);
  //     setPasswordHelperText("Password should be at least 6 characters");
  //   } else {
  //     setIsPasswordValid(true);
  //     setPasswordHelperText("");
  //   }
  // };

  // const checkFirstNameInput = (event) => {
  //   if (event.currentTarget.value === "" || event.currentTarget.value < 6) {
  //     setFirstNameValid(false);
  //     setFirstNameHelperText("Please enter your first name");
  //   } else {
  //     setFirstNameValid(true);
  //     setFirstNameHelperText("");
  //   }
  // };

  // const checkLastNameInput = (event) => {
  //   if (event.currentTarget.value === "" || event.currentTarget.value < 6) {
  //     setIsLastNameValid(false);
  //     setLastNameHelperText("Please enter your last name");
  //   } else {
  //     setIsLastNameValid(true);
  //     setLastNameHelperText("");
  //   }
  // };

  // const checkBirthdayInput = (event) => {
  //   if (event.currentTarget.value === "" || event.currentTarget.value < 6) {
  //     setIsBirthdayValid(false);
  //     setBirthdayHelperText("Please enter your birthday");
  //   } else {
  //     setIsBirthdayValid(true);
  //     setBirthdayHelperText("");
  //   }
  // };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
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
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                error={!isFirstNameValid}
                helperText={firstNameHelperText}
                onBlur={checkFirstNameInput}
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
                error={!isLastNameValid}
                helperText={lastNameHelperText}
                onBlur={checkLastNameInput}
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="date"
                label="Birthday"
                type="date"
                id="date"
                error={!isBirthdayValid}
                helperText={birthdayHelperText}
                onBlur={checkBirthdayInput}
                size="small"

                // InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                error={!isEmailValid}
                helperText={emailHelperText}
                onBlur={checkEmailInput}
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                error={!isPasswordValid}
                helperText={passwordHelperText}
                onBlur={checkPasswordInput}
                size="small"
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
                  type="file"
                  id="image"
                  hidden
                  accept=".png, .jpg, .jpeg"
                  onChange={onSelectFile}
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
            type="submit"
            fullWidth
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
