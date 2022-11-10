import { Container, CssBaseline, Grid } from '@material-ui/core';

import Footer from './Footer';
import Header from './Header';
import SignupForm from './SignupForm';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  pagebody: {
    backgroundColor: theme.palette.backgroundcolor,
  },
  pagecontainer: {
    padding: '0',
  },
}));

export default function SignupPage(props) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg" className={classes.pagecontainer}>
        <Header title="social prescribing." />
        <main className={classes.pagebody}>
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
