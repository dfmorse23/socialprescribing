import { Button, Toolbar, Link, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    background: theme.palette.beige2,
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  toolbarTitle: {
    flex: 1,
    fontWeight: 'bold',
    color: theme.palette.titleColor,
    paddingLeft: theme.spacing(6)
  },
  toolbarButton: {
    textAlign: 'left',
    marginRight: theme.spacing(6),
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

  // TODO:: this needs to be responsive -- probably use grid
  return (
    <React.Fragment>
      <Toolbar className={classes.toolbar}>
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
        <div>
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
        </div>
      </Toolbar>
    </React.Fragment >
  );
}

Header.propTypes = {
  headerSections: PropTypes.array,
  title: PropTypes.string,
};
