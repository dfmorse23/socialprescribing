import { Container, CssBaseline, Grid } from '@material-ui/core';

import Footer from '../components/Footer';
import Header from '../components/Header';
import React from 'react';
import ForgotPasswordForm from '../components/auth/ForgotPasswordForm';

export default function ForgotPasswordPage(props) {

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg" >
        <Header title="social prescribing." />
        <main>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <ForgotPasswordForm />
          </Grid>
        </main>
      </Container>
      <Footer title="social prescribing." description="Fill your social prescription today!" />
    </React.Fragment >
  );
}
