import { Grid, FormControl, OutlinedInput, FormLabel, Button, Link } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { useAuth } from '../../contexts/AuthContext'

import React, { useState } from 'react';

const useStyles = makeStyles((theme) => ({
  modal: {
    overflow: 'scroll',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  paper: {
    width: '500px',
    backgroundColor: theme.palette.background.paper,
    borderRadius: '7px',
    boxShadow: theme.shadows[4],
    padding: theme.spacing(4, 8, 4),
    margin: '40px 0',
  },
  formControl: {
    margin: '10px 0',
    width: '100%',
  },
  formLabel: {
    margin: '10px 0',
  },
  button: {
    marginTop: '15px',
    width: '100%',
    padding: '15px',
  },
  submit: {
    backgroundColor: theme.palette.bluePrimary,
    '&:hover': {
      backgroundColor: theme.palette.blueSecondary,
    },
  },
  oAuth: {
    marginBottom: '20px',
    backgroundColor: '#2d3748',
    '&:hover': {
      backgroundColor: '#2b3444',
    },
  },
  icon: {
    marginRight: '20px',
  },
}));

export default function ForgotPasswordForm(props) {
  const classes = useStyles();
  const [email, setEmail] = useState('')
  const [validationError, setValidationError] = useState()
  const [successMessage, setSuccessMessage] = useState()
  const [loading, setLoading] = useState(false)
  const { resetPassword } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setSuccessMessage('')
      setValidationError('')
      setLoading(true)

      await resetPassword(email)
      setSuccessMessage('Check your inbox for the reset email.')

    } catch (err) {
      setValidationError('Reset email could not be sent.')
    }

    setLoading(false)
  }

  return (
    <React.Fragment>
      <div className={classes.paper}>
        <Grid>
          <p>Forgot your password?</p>
          <h2>Send Password Reset Email</h2>
          {successMessage ? <Alert severity="success">{successMessage}</Alert> : ""}
          {validationError ? <Alert severity="error">{validationError}</Alert> : ""}
        </Grid>
        <form className={classes.root} noValidate autoComplete="off">
          <FormControl className={classes.formControl} required variant={"outlined"}>
            <FormLabel className={classes.formLabel} htmlFor="email" shrink='false' name="email">Email</FormLabel>
            <OutlinedInput id="email" aria-describedby="email address" value={email} onChange={(e) => setEmail(e.target.value)} />
          </FormControl>



          <Button disabled={loading} variant="contained" color="primary" className={`${classes.button} ${classes.submit}`} type="Submit" onClick={handleSubmit}>
            Reset Password
          </Button>

          <Grid container
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
          >
            <Grid item>
              <p>Back to&nbsp;</p>
            </Grid>
            <Grid item>
              <Link href="#/signin" variant="body2">
                Login
              </Link>
            </Grid>
          </Grid>

        </form >
      </div >
    </React.Fragment>
  );
}
