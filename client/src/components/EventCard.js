import { Box, Button, Grid, Typography, IconButton, CardActions } from '@material-ui/core';
import { Card, CardActionArea, CardContent, CardMedia } from '@material-ui/core';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { useAuth } from '../contexts/AuthContext';

import PropTypes from 'prop-types';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    padding: theme.spacing(3),
    paddingBottom: theme.spacing(2),
    maxHeight: 175,
    borderRadius: 30,
  },
  cardTitleText: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cardSubText: {
    textTransform: 'none',
    textAlign: 'center',
  },
  fullHeightCard: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'space-between',
    justifyContent: 'space-between'
  },
  spacedCardActionArea: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardImageTitleArea: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  eventCardTitle: {
    '&:last-child': {
      paddingTop: 0,
      paddingBottom: 0,
      paddingLeft: theme.spacing(1),
      textAlign: 'center',
    },
  },
  customBox: {
    display: "-webkit-box",
    boxOrient: "vertical",
    lineClamp: 2,
    overflow: "hidden"
  },
}));

export default function EventCard(props) {
  const classes = useStyles();
  const { event } = props;
  const { currentUser } = useAuth();

  const handleLike = async () => {
    console.log(currentUser.uid)
    // Send UUID and event object to the backend favorites endpoint
    // const response = await fetch(`http://localhost:3001/api/`, {
    //   method: "POST",
    //   headers: { "Content-type": "application/json" },
    // })
  }

  return (
    <Grid item xs={6} md={3}>
      <Card className={classes.fullHeightCard}>
        <CardActionArea href={event.url}>
          <CardMedia
            className={classes.media}
            image="/static/images/cards/contemplative-reptile.jpg"
            title="Contemplative Reptile"
          />
          <CardContent className={classes.eventCardTitle}>
            <CardMedia component="img" image={"https://source.unsplash.com/1600x900/?nature,water"} title={event.title} className={classes.cardMedia} />
            <Box
              component="div"
              classes={{ root: classes.customBox }}
            >
              <Typography variant="body1" className={classes.cardTitleText}>
                {event.title}
              </Typography>
            </Box>
          </CardContent>
        </CardActionArea>
        <CardActions className={classes.cardActionsContainer}>
          <Grid container justifyContent="space-around" alignItems="center">
            <IconButton aria-label="add to favorites" onClick={() => handleLike()}>
              <FavoriteIcon />
            </IconButton>
            <Button variant="contained" size="small" disabled className={classes.cardSubText}>
              {event.tag}
            </Button>
          </Grid>
        </CardActions>
      </Card>
    </Grid >
  );
}

EventCard.propTypes = {
  event: PropTypes.object,
};
