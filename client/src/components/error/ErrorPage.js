import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Container, CssBaseline, Button } from '@material-ui/core';
import PageErrorArt from '../../images/PageErrorArt.svg'
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: '20px',
    width: '80%',
    maxWidth: '200px',
    padding: '10px',
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: theme.palette.bluePrimary,
    '&:hover': {
      backgroundColor: theme.palette.blueSecondary,
    },
  },
  errorImage: {
    width: '80%',
    marginBottom: '30px',
    marginTop: '80px',
  },
  themeText: {
    color: theme.palette.bluePrimary,
  },
  fullPage: {
    width: '100vw',
    height: '100vh',
    backgroundColor: theme.palette.backgroundcolor,
  },
  errorTitle: {
    marginBottom: '0',
  },
}));


export default function ErrorPage(props) {
  const classes = useStyles();
  const history = useHistory();

  const navigateHome = () => {
    history.push('/')
    history.go(0)
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Grid className={classes.fullPage}>
        <Container maxWidth="sm">
          <Grid container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <img src={PageErrorArt} className={`${classes.errorImage}`} alt="error" />
            <h1 className={classes.errorTitle}><span className={classes.themeText}>Oops!</span> Something went wrong!</h1>
            <h3>The application has encountered an unknown error.</h3>
            <Button variant="contained" color="primary" className={`${classes.button} ${classes.backButton}`} type="Submit" onClick={navigateHome}>
              Back to Homepage
            </Button>
          </Grid>
        </Container>
      </Grid>
    </React.Fragment>
  );
}
