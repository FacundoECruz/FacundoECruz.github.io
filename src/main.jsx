import ReactDOM from "react-dom/client";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import App from "./App.jsx";
import "./index.css";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { SnackbarProvider } from "notistack";

const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#1a37da",
    },
    secondary: {
      main: "#f50057",
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
        <CssBaseline />
        <App />
      </SnackbarProvider>
    </ThemeProvider>
);
