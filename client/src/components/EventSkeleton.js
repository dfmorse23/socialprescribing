import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  "@keyframes shimmer": {
    "0%": {
      backgroundPosition: '-450px 0',
    },
    "100%": {
      opacity: '450px 0',
    }
  },
  skeletonWrapper: {
    backgroundColor: '#ddd',
    overflow: 'hidden',
    margin: '10px 0',
    borderRadius: '5px',
    backgroundImage: 'linear-gradient(to right, #d9d9d9 0%, rgba(0, 0, 0, 0.05) 20%, #d9d9d9 40%, #d9d9d9 100%)',
    backgroundRepeat: 'noRepeat',
    backgroundDize: '450px 400px',
    animation: '$shimmer 1s linear infinite',
  },
  skeletonCardImage: {
    height: '120px',
    width: '100%',
  },
  skeletonCardTitle: {
    height: '20px',
    width: '80%',
  },
  skeletonCardDetails: {
    height: '20px',
    width: '60%',
  },
  skeletonCardDetails2: {
    height: '20px',
    width: '55%',
  },


  skeleton: {
    height: '100%',
    transform: 'translate(100%)',
    animation: `$leftToRight 1500ms linear infinite`,
  },
  skeletonIndicator: {
    width: '5px',
    background: '#ccc',
    height: '100%',
    boxShadow: '0 0 10px 10px #ccc',
  },
}))

export default function EventSkeleton(props) {
  const classes = useStyles()

  return (
    <Grid item xs={6} md={3}>
      <div
        className={`${classes.skeletonWrapper} ${classes.skeletonCardImage}`}
      >
      </div>

      <div
        className={`${classes.skeletonWrapper} ${classes.skeletonCardTitle}`}
      >
      </div>

      <div
        className={`${classes.skeletonWrapper} ${classes.skeletonCardDetails}`}
      >
      </div>

      <div
        className={`${classes.skeletonWrapper} ${classes.skeletonCardDetails2}`}
      >
      </div>
    </Grid>
  );
};