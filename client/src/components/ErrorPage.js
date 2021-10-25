import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Container, CssBaseline, Button } from '@material-ui/core';
import PageErrorArt from '../images/PageErrorArt.svg'
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: '20px',
    width: '80%',
    maxWidth: '200px',
    padding: '10px',
    fontWeight: 'bold',
  },
  submit: {
    backgroundColor: theme.palette.green1,
    '&:hover': {
      backgroundColor: theme.palette.green3,
    },
  },
  errorImage: {
    width: '80%',
    marginBottom: '30px',
    marginTop: '80px',
  },
  themeText: {
    color: theme.palette.green1,
  },
  fullPage: {
    width: '100vw',
    height: '100vh',
    backgroundColor: theme.palette.beige2,
  },
  errorTitle: {
    marginBottom: '0',
  },
}));


export default function ErrorPage(props) {
  const classes = useStyles();
  const history = useHistory();

  const navigateHome = () => {
    history.push('/#')
  }

  return (
    <React.Fragment>
      <div className={classes.fullPage}>
        <CssBaseline />
        <Container maxWidth="sm">
          <Grid container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <img src={PageErrorArt} className={`${classes.errorImage}`} alt="error" />
            <h1 className={classes.errorTitle}><span className={classes.themeText}>Oops!</span> Something went wrong!</h1>
            <h3>The application has encountered an unknown error.</h3>
            <Button variant="contained" color="primary" className={`${classes.button} ${classes.submit}`} type="Submit" onClick={navigateHome}>
              Back to Homepage
            </Button>
          </Grid>
        </Container>
      </div>
    </React.Fragment>
  );
}
