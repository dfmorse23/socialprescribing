import React, { useState } from 'react';
import { Modal, FormControl, OutlinedInput, FormLabel, FormControlLabel, Grid, Checkbox, Link, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router';

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
    margin: '10px 0',
  },
  button: {
    width: '100%',
    marginTop: '15px',
    padding: '15px',
    backgroundColor: '#50c45b',
    '&:hover': {
      backgroundColor: '#49b353',
    },
  },
}));


export default function SignInModal(props) {
  const history = useHistory();
  const classes = useStyles();
  const isOpen = props.isModalOpen || false
  const [rememberMe, setRememberMe] = useState(false)


  const body = (
    <div className={classes.paper}>
      <p>Welcome back</p>
      <h2>Login to your account.</h2>
      <form className={classes.root} noValidate autoComplete="off">
        <FormControl className={classes.formControl} required variant={"outlined"}>
          <FormLabel className={classes.formLabel} htmlFor="email" shrink='false' name="email">Email</FormLabel>
          <OutlinedInput id="email" aria-describedby="email address" />
        </FormControl>

        <FormControl className={classes.formControl} required variant={"outlined"}>
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
              control={
                <Checkbox checked={rememberMe} color="primary" onChange={(e) => setRememberMe(Boolean(e.target.checked))} name="rememberMe" />
              }
              label="Remember Me"
            />
          </Grid>

          <Grid item>
            <Link href="#" variant="body2">
              Forgot Password?
            </Link>
          </Grid>
        </Grid>

        <Button variant="contained" color="primary" className={classes.button} type="Submit">
          Login Now
        </Button>
      </form >
    </div >
  );

  return (
    <div>
      <Modal
        open={isOpen}
        onClose={() => history.push("/#")}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}