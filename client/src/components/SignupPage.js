import { Container, CssBaseline } from '@material-ui/core';

import Footer from './Footer';
import Header from './Header';
import React from 'react';

export default function SignupPage(props) {

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg" >
        <Header title="social prescribing." />
        <main>
          {/* <SignupForm /> */}
        </main>
      </Container>
      <Footer title="social prescribing." description="Fill your social prescription today!" />
    </React.Fragment >
  );
}
