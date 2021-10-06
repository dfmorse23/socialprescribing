import { Box, Button, Grid, Typography, IconButton, CardActions } from '@material-ui/core';
import { Card, CardActionArea, CardContent, CardMedia } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { useAuth } from '../contexts/AuthContext';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const addDashes = require("add-dashes-to-uuid")

const useStyles = makeStyles((theme) => ({
  cardDetails: {
    flex: 1,
  },
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
    console.log(addDashes(currentUser.uid))

    try {
      const response = await fetch(`http://localhost:3001/user/addFavorite/45b9e074-8655-4aef-bb03-dde07d0171a9`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ event }),
      })


      const resJson = response

      console.log(resJson)
    }
    catch (err) {
      // Show a general search failed error to the user
      console.log(err.message)
      console.log(err)
    }

  }

  return (
    <Grid item xs={6} md={3}>
      <Card className={classes.fullHeightCard}>
        <CardActionArea onClick={() => window.open(event.url, "_blank")} >
          <CardContent className={classes.eventCardTitle} style={{ padding: "0px" }}>
            <CardMedia component="img" image={event.image ? event.image : `https://source.unsplash.com/collection/2178991,sig=${props.sig}`} title={event.title} className={classes.cardMedia} />
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
