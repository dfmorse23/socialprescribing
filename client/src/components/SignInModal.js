import React, { useState } from 'react';
import { Modal } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  modal: {
    height: '100vh',
    width: '100vw',
    display: 'flex',
    alignItems: 'center',
  },
  paper: {
    margin: '0 auto',
    width: '400px',
    backgroundColor: theme.palette.background.paper,
    borderRadius: '7px',
    boxShadow: theme.shadows[4],
    padding: theme.spacing(2, 4, 3),
  },
}));


export default function SignInModal(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false)

  const body = (
    <div className={classes.modal}>
      <div className={classes.paper}>
        <p>Welcome back</p>
        <h2>Login to your account.</h2>
      </div>
    </div>
  );

  return (
    <div>
      <button type="button" onClick={() => setOpen(true)}>
        Open Modal
      </button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div onClick={() => setOpen(false)}>
          {body}
        </div>
      </Modal>
    </div>
  );
}