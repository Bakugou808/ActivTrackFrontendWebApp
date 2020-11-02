import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./Redux/ReduxStore";

import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { deepOrange } from "@material-ui/core/colors";
import Typography from "@material-ui/core/Typography";

const theme = createMuiTheme({
  palette: {
    primary: {
      // deep orange.
      main: "#ff5722",
    },
    secondary: {
      // light -> light blue, main -> deep turquoise
      light: "#18ffff",
      main: "#26a69a",
      dark: "#00796b",
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
  typography: {
    fontSize: 16,
    // fontFamily: [
    //   "-apple-system",
    //   "BlinkMacSystemFont",
    //   '"Segoe UI"',
    //   "Roboto",
    //   '"Helvetica Neue"',
    //   "Arial",
    //   "sans-serif",
    //   '"Apple Color Emoji"',
    //   '"Segoe UI Emoji"',
    //   '"Segoe UI Symbol"',
    // ].join(","),
  },
  // overrides: {
  //   MuiCssBaseline: {
  //     "@global": {
  //       "@font-face": [arial],
  //     },
  //   },
  // },
});

theme.typography.h3 = {
  fontSize: "1.2rem",
  "@media (min-width:600px)": {
    fontSize: "1.5rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "2.4rem",
  },
};

ReactDOM.render(
  // <React.StrictMode>
  <Provider store={store}>
    <Router>
      {/* <CssBaseline /> */}
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Router>
  </Provider>,
  // </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
