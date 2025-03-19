import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    /* 元件顏色 */
    primary: {
      main: "#67d735",
      contrastText: "#fffffd",
    },
    secondary: {
      main: "rgba(128, 128, 128, 0.5)",
    },
    text: {
      primary: "#fffffd",
      secondary: "#67d735",
    },
    background: {
      default: "#18181a",
      paper: "rgba(20, 20, 20, 0.9)",
    },
  },
  typography: {
    h1: {
      fontSize: "2rem",
      fontWeight: 700,
      marginTop: "0.5rem",
      marginBottom: 0,
      padding: "0.5rem",
    },
  },
});

export default theme;
