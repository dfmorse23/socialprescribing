import { Box, Button, Grid, Typography, IconButton, CardActions } from '@material-ui/core';
import { Card, CardActionArea, CardContent, CardMedia } from '@material-ui/core';
// what is this border icon for? 
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { useAuth } from '../contexts/AuthContext';
import { useHistory } from 'react-router';

import PropTypes from 'prop-types';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

/*
TO DO: 
- inspect Airbnb's styling for their cards and search results 
- look through Material UI's syntax on how to make the cardMedia into a card background
  - possibly have to load images as props, check with backend to see if images are being
    saved in json file with each prescription 
  - then use useState to take in the images as objects to be used for each card 
- add an icon to the card for the link to the site the card is referring to 
- figure out why the card images' widths is depending on the title text
- fix the flexbox to make the cards stay the same size despite the browser width changing 
*/

const useStyles = makeStyles((theme) => ({
  cardDetails: {
    flex: 1,
  },
  /* search how to make this cardMedia the card background, like Airbnb's cards  */
  cardMedia: {
    paddingBottom: theme.spacing(2),
    maxHeight: 175,
    borderRadius: 5,
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
  const history = useHistory();

  const handleLike = async () => {
    if (!currentUser) {
      history.push('/signin')
      return
    }
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
            {/* why are there two card media tags? */}
            <CardMedia component="img" image={"https://source.unsplash.com/1600x900/?nature,water"} title={event.title} className={classes.cardMedia} />
            {/* what will happen if we seperate the cardMedia and the box component? will that 
                fix the issue of the image width depending on the card's title? */}
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
            {/* add icon for link to social prescription, instead of the whole card being a link */}
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
