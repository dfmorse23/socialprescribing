import { Container, CssBaseline } from '@material-ui/core';

import Footer from './Footer';
import React from 'react';

export default function ErrorPage(props) {

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg" >
        <main>
          <h1>Something Went Wrong!</h1>
          <button>Back to Home</button>
        </main>
      </Container>
      <Footer title="social prescribing." description="Fill your social prescription today!" />
    </React.Fragment>
  );
}
