import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Container, CssBaseline, Button } from '@material-ui/core';
import Page404Art from '../images/Page404Art.svg'
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: '10px',
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
    marginTop: '30px',
  },
  themeText: {
    color: theme.palette.green1,
  },
}));


export default function Error404Page(props) {
  const classes = useStyles();
  const history = useHistory();

  const navigateHome = () => {
    history.push('/#')
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <Grid container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <img src={Page404Art} className={`${classes.errorImage}`} alt="404 Error" />
          <h1><span className={classes.themeText}>404</span> - Page Not Found</h1>
          <Button variant="contained" color="primary" className={`${classes.button} ${classes.submit}`} type="Submit" onClick={navigateHome}>
            Back to Homepage
          </Button>
        </Grid>
      </Container>
    </React.Fragment>
  );
}
