import { useForm } from "react-hook-form";

import useImagePreview from "../../hooks/useImagePreview";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import EditCalendarOutlinedIcon from "@mui/icons-material/EditCalendarOutlined";

export default function CreateEvent() {
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
          marginTop: 2,
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <EditCalendarOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Create Event
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 2 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                id="title"
                name="title"
                label="Title"
                size="small"
                autoComplete="title"
                {...register("title", {
                  required: "title is required",
                })}
                error={!!errors.title}
                helperText={errors.title?.message}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="date"
                name="date"
                label="Date"
                type="date"
                size="small"
                {...register("date", {
                  required: "date is required",
                })}
                error={!!errors.date}
                helperText={errors.date?.message}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="time"
                name="time"
                label="Time"
                type="time"
                size="small"
                {...register("time", {
                  required: "time is required",
                })}
                error={!!errors.time}
                helperText={errors.time?.message}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="address"
                name="address"
                label="Address"
                size="small"
                {...register("address", {
                  required: "address is required",
                })}
                error={!!errors.address}
                helperText={errors.address?.message}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="description"
                name="description"
                label="Description"
                rows="3"
                multiline
                minLength="1"
                size="small"
                inputProps={{ maxLength: 500 }}
                {...register("description", {
                  required: "please enter a description about this event",
                })}
                error={!!errors.description}
                helperText={errors.description?.message}
                required
                fullWidth
              />
            </Grid>
            {preview && (
              <Grid item xs={12}>
                <Avatar
                  variant="square"
                  sx={{
                    width: "100%",
                    height: "8rem",
                    bgcolor: "rgba(25,118,210,0.57)",
                    borderRadius: 2,
                  }}
                  src={preview}
                ></Avatar>
              </Grid>
            )}
            <Grid item xs={12}>
              <Button
                variant="outlined"
                component="label"
                startIcon={<CloudUploadIcon />}
                size="large"
                sx={{
                  textTransform: "none",
                }}
              >
                Upload image
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
            </Grid>
          </Grid>
          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{ mt: 2, mb: 2 }}
          >
            Create Event
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
