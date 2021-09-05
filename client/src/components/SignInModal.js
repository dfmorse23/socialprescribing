import React, { useState } from 'react';
import { Modal, FormControl, OutlinedInput, FormLabel, FormControlLabel, Grid, Checkbox, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: '100px auto',
    width: '500px',
    backgroundColor: theme.palette.background.paper,
    borderRadius: '7px',
    boxShadow: theme.shadows[4],
    padding: theme.spacing(4, 10, 8),
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  formControl: {
    margin: '20px 0',
    width: '100%',
  },
  formLabel: {
    margin: '10px 0'
  },
}));


export default function SignInModal(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false)

  const body = (
    <div className={classes.paper}>
      <p>Welcome back</p>
      <h2>Login to your account.</h2>
      <form className={classes.root} noValidate autoComplete="off">
        <FormControl className={classes.formControl} required="true" variant={"outlined"}>
          <FormLabel className={classes.formLabel} htmlFor="email" shrink='false' name="email">Email</FormLabel>
          <OutlinedInput id="email" aria-describedby="email address" />
        </FormControl>

        <FormControl className={classes.formControl} required="true" variant={"outlined"}>
          <FormLabel className={classes.formLabel} htmlFor="password" shrink='false' name="password">Password</FormLabel>
          <OutlinedInput id="password" aria-describedby="password" />
        </FormControl>

        <Grid container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item>
            <FormControlLabel
              control={<Checkbox checked={false} onChange={() => { }} name="rememberMe" />}
              label="Remember Me"
            />
          </Grid>

          <Grid item>
            <Link href="#" variant="body2">
              Forgot Password?
            </Link>
          </Grid>
        </Grid>
      </form >
    </div >
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
        {body}
      </Modal>
    </div>
  );
}