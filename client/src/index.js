import "./index.css";

import LandingPage from "./pages/LandingPage";
import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import { createTheme } from "@material-ui/core/styles";
import reportWebVitals from "./reportWebVitals";
import { HashRouter, Route, Switch } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContextnew";
import SignupPage from "./pages/SignupPage";
import SigninPage from "./pages/SigninPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ErrorBoundary from "./components/error/ErrorBoundary";
import Error404Page from "./components/error/Error404Page";
import { queryClient } from "./api";
import { QueryClientProvider } from "react-query";

// import Blog from './components/Blog';

const theme = createTheme({
  // Blue 1 - Primary Color
  // Blue 2 - Secondary Color
  // Background Color - Background Color
  // Title Color - Title Color
  palette: {
    bluePrimary: "#4361EE",
    blueSecondary: "#7B8CEC",
    backgroundColor: "#FAFAFA",
    titleColor: "#4361EE",
    textColor: "#363C57",
    greyPrimary: "#363C57",
    greyMedium: "#535874",
    greyLight: "#7F85A0",
  },
  shape: {
    roundBtn: '100px',
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
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <HashRouter>
          <ErrorBoundary theme={theme}>
            <Switch>
              <Route exact path="/" component={LandingPage} />
              <Route
                exact
                path="/signin"
                component={() => <SigninPage />}
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
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
