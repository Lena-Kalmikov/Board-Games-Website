import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#B63EFD",
    },
    secondary: {
      main: "#00c2c2",
    },
    background: {
      default: "#ececf3",
      paper: "#f3f3f3",
      navBar: "#423f44",
      deleteHover: "rgba(249,222,221,0.52)",
      lightPaper: "#efebf2",
      siteName: "white",
    },
    text: {
      primary: "#160325",
      secondary: "#4e4d50",
      hint: "#c098d6",
      footer: "#403f44",
      icon: "#f2e2fb",
    },
    divider: "rgba(146,138,152,0.37)",
    error: {
      main: "#fd3927",
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "rgb(221, 51, 250)",
    },
    secondary: {
      main: "#15e9c5",
    },
    background: {
      default: "#121218",
      paper: "#1d1b1e",
      navBar: "#1d1b1e",
      lightPaper: "#423f44",
      siteName: "#15e9c5",
      deleteHover: "rgba(255,166,165,0.19)",
    },
    text: {
      primary: "#f2e2fb",
      secondary: "rgba(233,230,241,0.7)",
      footer: "#9b9aa0",
      hint: "#c098d6",
      icon: "#f2e2fb",
    },
    error: {
      main: "#FD3927",
    },
    divider: "rgba(243,241,247,0.41)",
  },
});

export { lightTheme, darkTheme };
