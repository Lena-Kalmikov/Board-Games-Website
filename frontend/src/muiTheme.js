import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#f50057",
    },
    background: {
      deleteHover: "#fff6f3",
      paper: "#423f44",
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#f53b7f",
    },
    secondary: {
      main: "#15e9c5",
    },
    background: {
      default: "#121218",
      paper: "#1d1b1e",
      lightPaper: "#423f44",
    },
    text: {
      primary: "#f2e2fb",
      secondary: "rgba(215,209,220,0.7)",
      footer: "#9b9aa0",
      hint: "#c098d6",
    },
    error: {
      main: "#FD3927",
    },
    divider: "rgba(243,241,247,0.41)",
  },
});

export { lightTheme, darkTheme };
