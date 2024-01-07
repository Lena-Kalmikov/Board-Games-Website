import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Controller, set, useForm } from "react-hook-form";
import db from "../../firebase";
import { useAuth, uploadImage } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import useImagePreview from "../../hooks/useImagePreview";
import useFadeInEffect from "../../hooks/useFadeInEffect";
import dayjs from "dayjs";

import "dayjs/locale/en-gb";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

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
  const [photo, setPhoto] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const currentUser = useAuth();
  const creator = currentUser?.uid;

  const navigate = useNavigate();
  const isComponentLoaded = useFadeInEffect();

  const { preview, onSelectFile } = useImagePreview();

  const { register, handleSubmit, formState, control, trigger } = useForm({
    mode: "all",
  });

  const { errors } = formState;

  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const handleImageChange = (e) => {
    onSelectFile(e);
    setPhoto(e.target.files[0]);
  };

  const addEventToFirebase = async (eventData) => {
    try {
      const eventRef = doc(db, "events", uuidv4());
      await setDoc(eventRef, eventData);
    } catch (error) {
      setAlertMessage(`Error during adding new event: ${error.message}`);
    }
  };

  const onSubmit = async (data) => {
    try {
      const gameIds = data.games.map((game) => game.id);

      let imageUrl = "";
      if (photo) {
        imageUrl = await uploadImage(photo, setIsLoading);
      }

      // Convert date and time to ISO strings
      const date = data.date.toISOString();
      const time = data.time.toISOString();

      const eventData = {
        ...data,
        date, // Send date as ISO string
        time, // Send time as ISO string
        games: gameIds, // Send only game IDs
        image: imageUrl, // Send image URL
        creator,
        participants: [creator], // Add creator to participants
        isDeleted: false,
      };
      addEventToFirebase(eventData);
      navigate("/events");
    } catch (error) {
      setAlertMessage(`Error during adding new event: ${error.message}`);
      setIsAlertOpen(true);
    }
    setIsLoading(false);
  };

  const handleAlertClose = () => {
    setIsAlertOpen(false);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
      <Fade in={isComponentLoaded} timeout={{ enter: 500 }}>
        <Container maxWidth="xs">
          <Box
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            marginTop={2}
          >
            <Avatar
              sx={{
                margin: 1,
                backgroundColor: "primary.main",
                color: "text.primary",
              }}
            >
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
                    autoComplete="title"
                    error={formState.isSubmitted && !!errors.title}
                    helperText={formState.isSubmitted && errors.title?.message}
                    {...register("title", {
                      required: "title is required",
                    })}
                  />
                </Grid>
                <Grid item xs={6}>
                  {/* <TextField
                  id="date"
                  name="date"
                  label="Date"
                  type="date"
                  required
                  fullWidth
                  size="small"
                  error={formState.isSubmitted && !!errors.date}
                  helperText={formState.isSubmitted && errors.date?.message}
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
                /> */}
                  <Controller
                    name="date"
                    control={control}
                    rules={{
                      required: "Date is required",
                      validate: (value) => {
                        const selectedDate = new Date(value);
                        const currentDate = new Date();
                        currentDate.setHours(0, 0, 0, 0);
                        return (
                          selectedDate >= currentDate ||
                          "Date should be in the future"
                        );
                      },
                    }}
                    render={({ field }) => (
                      <DatePicker
                        label="Date"
                        disablePast
                        slotProps={{
                          openPickerButton: { color: "secondary" },
                          textField: {
                            error: formState.isSubmitted && !!errors.date,
                            helperText:
                              formState.isSubmitted && errors.date?.message,
                          },
                        }}
                        value={field.value}
                        onChange={(date) => field.onChange(date)}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={6}>
                  {/* <TextField
                  id="time"
                  name="time"
                  label="Time"
                  type="time"
                  required
                  fullWidth
                  size="small"
                  error={formState.isSubmitted && !!errors.time}
                  helperText={formState.isSubmitted && errors.time?.message}
                  {...register("time", {
                    required: "time is required",
                  })}
                /> */}
                  <Controller
                    name="time"
                    control={control}
                    rules={{ required: "Time is required" }}
                    render={({ field, fieldState: { error } }) => (
                      <TimePicker
                        label="Time"
                        slotProps={{
                          openPickerButton: { color: "secondary" },
                          textField: {
                            error: formState.isSubmitted && !!errors.time,
                            helperText:
                              formState.isSubmitted && errors.time?.message,
                          },
                        }}
                        value={field.value}
                        onChange={(time) => field.onChange(time)}
                        error={!!error}
                        helperText={error ? error.message : null}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    id="city"
                    name="city"
                    label="City"
                    required
                    fullWidth
                    error={formState.isSubmitted && !!errors.city}
                    helperText={formState.isSubmitted && errors.city?.message}
                    {...register("city", {
                      required: "city is required",
                    })}
                  />
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    id="address"
                    name="address"
                    label="Address"
                    required
                    fullWidth
                    error={formState.isSubmitted && !!errors.address}
                    helperText={
                      formState.isSubmitted && errors.address?.message
                    }
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
                            error={formState.isSubmitted && !!errors.games}
                            helperText={
                              formState.isSubmitted && errors.games?.message
                            }
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
                              sx={{
                                backgroundColor: "background.paper",
                                border: "1px solid #15e9c5",
                                color: "#15e9c5",
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
                    error={formState.isSubmitted && !!errors.description}
                    helperText={
                      formState.isSubmitted && errors.description?.message
                    }
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
                      onChange={handleImageChange}
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
                disabled={isLoading}
                sx={{ marginTop: 2, marginBottom: 4 }}
              >
                Create Event
              </Button>
            </Box>
          </Box>
        </Container>
      </Fade>
    </LocalizationProvider>
  );
}
