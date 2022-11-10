import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Container, CssBaseline, Button } from '@material-ui/core';
import Page404Art from '../../images/Page404Art.svg'
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: '15px',
    width: '80%',
    maxWidth: '200px',
    padding: '10px',
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: theme.palette.blue1,
    '&:hover': {
      backgroundColor: theme.palette.blue2,
    },
  },
  errorImage: {
    width: '80%',
    marginBottom: '30px',
    marginTop: '30px',
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
  }
}));


export default function Error404Page(props) {
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
            <img src={Page404Art} className={`${classes.errorImage}`} alt="Lost person reading map" />
            <h1 className={classes.errorTitle} ><span className={classes.themeText}>404</span> - Page Not Found</h1>
            <h3>The page you're looking for could not be found.</h3>
            <Button variant="contained" color="primary" className={`${classes.button} ${classes.backButton}`} type="Submit" onClick={navigateHome}>
              Back to Homepage
            </Button>
          </Grid>
        </Container>
      </div>
    </React.Fragment>
  );
}
