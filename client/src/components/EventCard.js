import { Button, Grid, Typography } from '@material-ui/core';
import { Card, CardActionArea, CardContent, CardMedia } from '@material-ui/core';

import PropTypes from 'prop-types';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  card: {
    display: 'flex',
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    padding: theme.spacing(3),
    maxHeight: 200,
    borderRadius: 30,
  },
  cardTitleText: {
    fontWeight: 'bold',
    paddingLeft: theme.spacing(3),
    marginTop: -theme.spacing(3),
  },
  cardSubText: {
    textTransform: 'none',
    textAlign: 'center',
    marginLeft: theme.spacing(3),
    marginTop: theme.spacing(1),
  }
}));


export default function EventCard(props) {
  const classes = useStyles();
  const { event } = props;

  return (
    <Grid item xs={12} md={3}>
      <Card>
        <CardActionArea component="a" href={event.url} rel="noopener">
          <CardMedia component="img" image={event.image} title={event.title} className={classes.cardMedia} />
          <CardContent>
            <Typography variant="body1" className={classes.cardTitleText}>
              {event.title}
            </Typography>
            <Button variant="contained" size="small" disabled className={classes.cardSubText}>
              {event.tag}
            </Button>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid >
  );
}

EventCard.propTypes = {
  event: PropTypes.object,
};
