import { Button, Toolbar, Link, Typography, Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { useAuth } from '../contexts/AuthContext';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    background: theme.palette.beige2,
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  toolbarTitle: {
    flex: 1,
    fontWeight: 'bold',
    whiteSpace: 'no-wrap',
    color: theme.palette.titleColor,
    paddingRight: theme.spacing(4)
  },
  toolbarButton: {
    textAlign: 'left',
    marginRight: theme.spacing(4),
  },
}));

const headerSections = [
  { title: 'About', url: '#' },
  { title: 'For Healthcare Workers', url: '#' },
  { title: 'For Leaders', url: '#' },
  { title: 'Resources', url: '#' },
  { title: 'Sign In', url: '#/signin' },
]

export default function Header(props) {
  const classes = useStyles();
  const { title } = props;
  const { currentUser } = useAuth()

  // TODO:: this needs to be responsive -- probably use grid
  return (
    <React.Fragment>
      <Toolbar className={classes.toolbar}>
        <Grid
          container
          alignItems="center"
          justifyContent='space-between'
        >
          <Link href="#" underline="none">
            <Typography
              component='h2'
              variant="h5"
              color="inherit"
              align='left'
              className={classes.toolbarTitle}
            >
              {title}
            </Typography>
          </Link>
          <Grid>
            {headerSections.map((section) => (
              <Button size='medium' className={classes.toolbarButton} key={section.title}>
                <Link
                  color='inherit'
                  key={section.title}
                  href={section.url}
                  style={{ textDecoration: 'none' }}
                >
                  {section.title}
                </Link>
              </Button>
            ))}
            {currentUser ?
              <Link
                color='inherit'
                href={'#'}
                style={{ textDecoration: 'none' }}
              >
                {currentUser.email}
              </Link>
              : ''}
          </Grid>
        </Grid>
      </Toolbar>
    </React.Fragment >
  );
}

Header.propTypes = {
  headerSections: PropTypes.array,
  title: PropTypes.string,
};
