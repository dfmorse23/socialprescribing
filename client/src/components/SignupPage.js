import { Container, CssBaseline, Grid } from '@material-ui/core';

import Footer from './Footer';
import Header from './Header';
import SignupForm from './SignupForm';
import React from 'react';

export default function SignupPage(props) {

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
            <SignupForm />
          </Grid>

        </main>
      </Container>
      <Footer title="social prescribing." description="Fill your social prescription today!" />
    </React.Fragment >
  );
}
