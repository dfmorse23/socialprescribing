import { Container, CssBaseline, Grid } from '@material-ui/core';

import Footer from './Footer';
import Header from './Header';
import SignupForm from './SignupForm';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  orb: {
    position: 'absolute',
    width: '637px',
    height: '637px',
    zIndex: '-1',
    background: `linear-gradient(90deg, ${theme.palette.beige1} 0%, #FFFFFF 100%)`,
    filter: 'blur(100px)',
  },
}));

export default function SignupPage(props) {
  const classes = useStyles();

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
