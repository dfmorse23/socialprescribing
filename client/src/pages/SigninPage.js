import { Container, CssBaseline, Grid } from '@material-ui/core';

import Footer from '../components/Footer';
import Header from '../components/Header';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SigninForm from '../components/auth/SigninForm';

const useStyles = makeStyles((theme) => ({
  pagebody: {
    backgroundColor: theme.palette.backgroundcolor,
  },
  pagecontainer: {
    padding: '0',
  },
}));

const SigninPage = (props) => {
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
            <SigninForm />
          </Grid>
        </main>
      </Container>
      <Footer description="Fill your social prescription today!" />
    </React.Fragment >
  );
}

export default SigninPage;