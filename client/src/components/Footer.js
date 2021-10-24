import { Container, Grid, Link, Typography } from '@material-ui/core';

import PropTypes from 'prop-types';
import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: 'inherit',
    // I literally have no idea why there is this random spacing at the bottom
    // but -2 theme spacing removes it
    marginBottom: -theme.spacing(2),
  },
  footerContainer: {
    backgroundColor: theme.palette.beige3,
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
  footerTitle: {
    fontWeight: 'bold',
    color: theme.palette.titleColor,
  }
}));

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="#">
        social prescription.
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function Footer(props) {
  const classes = useStyles();
  const { description, title } = props;

  return (
    <footer className={classes.footer}>
      <Container maxWidth="lg" className={classes.footerContainer}>
        <Grid container alignItems="center">
          <Grid item xs={12} md={3}>
            <Typography
              component='h2'
              variant="h5"
              color="inherit"
              align='left'
              className={classes.footerTitle}
            >
              {title}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
              {description}
            </Typography>
            <Copyright />
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
}

Footer.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
};
