import "./index.css";

import LandingPage from "./components/LandingPage";
import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import { createTheme } from "@material-ui/core/styles";
import reportWebVitals from "./reportWebVitals";
import { HashRouter, Route, Switch } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import SignupPage from "./components/SignupPage";
import ForgotPasswordPage from "./components/ForgotPasswordPage";
import ErrorBoundary from "./components/ErrorBoundary";
import Error404Page from "./components/Error404Page";

// import Blog from './components/Blog';

const theme = createTheme({
  palette: {
    green1: "#17B793",
    green2: "#A4E2B4",
    green3: "#ACD4CC",
    beige1: "#F3ECBF",
    beige2: "#FAFAF2",
    beige3: "rgb(	251, 247, 225, 0.64)",
    titleColor: "#049579",
  },
  typography: {
    fontFamily: [
      'Poppins',
    ].join(","),
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <HashRouter>
          <ErrorBoundary theme={theme}>
            <Switch>
              <Route exact path="/" component={LandingPage} />
              <Route
                exact
                path="/signin"
                component={() => <LandingPage signin={true} />}
              />
              <Route exact path="/signup" component={SignupPage} />
              <Route
                exact
                path="/forgotpassword"
                component={ForgotPasswordPage}
              />
              {/* 404 page */}
              <Route path="*" component={Error404Page} />
            </Switch>
          </ErrorBoundary>
        </HashRouter>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
