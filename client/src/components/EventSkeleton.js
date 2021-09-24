import React from "react";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  "@keyframes leftToRight": {
    "0%": {
      transform: 'translate(0)',
    },
    "100%": {
      transform: 'translate(100%)',
    }
  },
  skeletonWrapper: {
    backgroundColor: '#ddd',
    height: '40px',
    width: '100%',
    overflow: 'hidden',
  },
  skeleton: {
    height: '100%',
    transform: 'translate(100%)',
    animation: `$leftToRight 2000ms ${theme.transitions.easing.easeInOut} infinite`,
  },
  skeletonIndicator: {
    width: '5px',
    background: '#bbb',
    height: '100%',
    boxShadow: '0 0 5px 5px #bbb',
  },
}))

export default function EventSkeleton(props) {
  const classes = useStyles()

  return (
    <div
      className={classes.skeletonWrapper}
    >
      <div className={classes.skeleton}>
        <div className={classes.skeletonIndicator} />
      </div>
    </div>
  );
};