import './index.css';

import LandingPage from './components/LandingPage';
import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import { createTheme } from '@material-ui/core/styles';
import reportWebVitals from './reportWebVitals';
import { HashRouter, Route } from "react-router-dom";
import { AuthProvider } from './contexts/AuthContext';
import SignupPage from './components/SignupPage';
import ForgotPasswordPage from './components/ForgotPasswordPage';
import ReactGA from 'react-ga';
import RouteChangeTracker from './components/RouteChangeTracker';

const TRACKING_ID = "UA-212335392-1"; // YOUR_OWN_TRACKING_ID
ReactGA.initialize(TRACKING_ID);

const theme = createTheme({
  palette: {
    green1: '#17B793',
    green2: '#A4E2B4',
    green3: '#ACD4CC',
    beige1: '#F3ECBF',
    beige2: '#FAFAF2',
    beige3: 'rgb(	251, 247, 225, 0.64)',
    titleColor: '#049579',
  },
  typography: {
    fontFamily: [
      'Quicksand',
      'Helvetica'
    ].join(','),
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme} >
      <AuthProvider>
        <HashRouter>
          <RouteChangeTracker />
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/signin" component={() => (
            <LandingPage signin={true} />
          )} />
          <Route exact path="/signup" component={SignupPage} />
          <Route exact path="/forgotpassword" component={ForgotPasswordPage} />
        </HashRouter>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
