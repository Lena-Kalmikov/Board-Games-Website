import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useAuth } from "../../firebase";
import db from "../../firebase";
import useImagePreview from "../../hooks/useImagePreview";
import useFadeInEffect from "../../hooks/useFadeInEffect";

import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Collapse from "@mui/material/Collapse";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Autocomplete from "@mui/material/Autocomplete";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import EditCalendarOutlinedIcon from "@mui/icons-material/EditCalendarOutlined";

export default function CreateEvent({ games }) {
  const currentUser = useAuth();
  const gameCreator = currentUser?.uid;

  const isComponentLoaded = useFadeInEffect();

  const { preview, onSelectFile } = useImagePreview();

  const { register, handleSubmit, formState, control, trigger } = useForm({
    mode: "all",
  });

  const { errors } = formState;

  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const alertMessage =
    "Unfortunately, this feature is not available yet. Thank you for your patience.";

    const addEventToFirebase = async (eventData) => {
      try {
        const eventRef = db.collection("events"); // replace "events" with your collection name
        const docRef = await eventRef.add(eventData);
        console.log("Document written with ID: ", docRef.id);
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    };


  // const onSubmit = (data) => {
  //   console.log(data);
  //   setIsAlertOpen(true);
  // };

  const onSubmit = (data) => {
    const eventData = {
      ...data,
      gameCreator,
      createdAt: new Date().toISOString(),
    };
    addEventToFirebase(eventData);
    setIsAlertOpen(true);
  };

  const handleAlertClose = () => {
    setIsAlertOpen(false);
  };

  return (
    <Fade in={isComponentLoaded} timeout={{ enter: 500 }}>
      <Container maxWidth="xs">
        <Box
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          marginTop={2}
        >
          <Avatar sx={{ margin: 1, backgroundColor: "secondary.main" }}>
            <EditCalendarOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Create Event
          </Typography>
          <Box
            noValidate
            marginTop={2}
            component="form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  id="title"
                  name="title"
                  label="Title"
                  required
                  fullWidth
                  size="small"
                  autoComplete="title"
                  error={!!errors.title}
                  helperText={errors.title?.message}
                  {...register("title", {
                    required: "title is required",
                  })}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="date"
                  name="date"
                  label="Date"
                  type="date"
                  required
                  fullWidth
                  size="small"
                  error={!!errors.date}
                  helperText={errors.date?.message}
                  onBlur={() => {
                    trigger("date");
                  }}
                  {...register("date", {
                    required: "date is required",
                    validate: (value) => {
                      const selectedDate = new Date(value);
                      const currentDate = new Date();
                      currentDate.setHours(0, 0, 0, 0);
                      return (
                        selectedDate >= currentDate ||
                        "date must be in the future"
                      );
                    },
                  })}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="time"
                  name="time"
                  label="Time"
                  type="time"
                  required
                  fullWidth
                  size="small"
                  error={!!errors.time}
                  helperText={errors.time?.message}
                  {...register("time", {
                    required: "time is required",
                  })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="address"
                  name="address"
                  label="Address"
                  required
                  fullWidth
                  size="small"
                  error={!!errors.address}
                  helperText={errors.address?.message}
                  {...register("address", {
                    required: "address is required",
                  })}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="games"
                  control={control}
                  rules={{ required: "please choose at least one game" }}
                  render={({ field }) => (
                    <Autocomplete
                      id="games"
                      multiple
                      filterSelectedOptions
                      options={games}
                      value={field.value}
                      onClose={field.onBlur}
                      onChange={(e, data) => field.onChange(data)}
                      getOptionLabel={(option) => option?.title}
                      getOptionDisabled={() =>
                        field.value?.length >= 4 ? true : false
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Games *"
                          error={!!errors.games}
                          helperText={errors.games?.message}
                          placeholder={
                            field.value?.length > 0
                              ? ""
                              : "Choose up to 4 games you want to play"
                          }
                        />
                      )}
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                          <Chip
                            variant="outlined"
                            label={option.title}
                            {...getTagProps({ index })}
                            style={{
                              backgroundColor: "#e3f2fd",
                              border: "none",
                            }}
                          />
                        ))
                      }
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="description"
                  name="description"
                  label="Description"
                  required
                  fullWidth
                  multiline
                  rows="3"
                  size="small"
                  minLength="1"
                  error={!!errors.description}
                  helperText={errors.description?.message}
                  inputProps={{ maxLength: 500 }}
                  {...register("description", {
                    required: "please enter a description about this event",
                  })}
                />
              </Grid>
              {preview && (
                <Grid item xs={12}>
                  <Avatar
                    sx={{
                      width: "100%",
                      height: "8rem",
                      backgroundColor: "rgba(25,118,210,0.57)",
                      borderRadius: 2,
                    }}
                    variant="square"
                    src={preview}
                  ></Avatar>
                </Grid>
              )}
              <Grid item xs={12}>
                <Button
                  size="large"
                  component="label"
                  variant="outlined"
                  startIcon={<CloudUploadIcon />}
                  sx={{
                    textTransform: "none",
                  }}
                >
                  Upload event image
                  <input
                    id="image"
                    name="image"
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    hidden
                    {...register("image")}
                    onChange={onSelectFile}
                  />
                </Button>
              </Grid>
            </Grid>
            <Collapse in={isAlertOpen}>
              <Alert
                severity="error"
                sx={{ marginTop: 2 }}
                action={
                  <IconButton
                    aria-label="close"
                    size="small"
                    onClick={handleAlertClose}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
              >
                {alertMessage}
              </Alert>
            </Collapse>
            <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={{ marginTop: 2, marginBottom: 4 }}
            >
              Create Event
            </Button>
          </Box>
        </Box>
      </Container>
    </Fade>
  );
}
