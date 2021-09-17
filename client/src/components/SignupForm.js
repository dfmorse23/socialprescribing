import { Grid, FormControl, OutlinedInput, FormLabel, Button, SvgIcon, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useAuth } from '../contexts/AuthContext'
import { useHistory } from 'react-router';

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
    backgroundColor: '#50c45b',
    '&:hover': {
      backgroundColor: '#49b353',
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

export default function SignupForm(props) {
  const classes = useStyles();
  const history = useHistory();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [validationError, setValidationError] = useState()
  const [loading, setLoading] = useState(false)
  const { signup, googleOAuth } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setValidationError('')
      setLoading(true)
      await signup(email, password, true)

      history.push('/#')

    } catch (err) {

      switch (err.code) {
        case 'auth/invalid-email':
          setValidationError('Please use a valid email')
          break;
        case 'auth/email-already-in-use':
          setValidationError('Email is already in use.')
          break;
        default:
          setValidationError('Account could not be created.')
      }
    }

    setLoading(false)
  }

  const googleSignIn = async () => {
    try {
      setValidationError('')
      setLoading(true)

      await googleOAuth(true)

      history.push('/#')

    } catch (err) {
      setValidationError('Could not sign in with Google.')
    }

    setLoading(false)
  }

  return (
    <React.Fragment>
      <div className={classes.paper}>
        <Grid>
          <p>Welcome,</p>
          <h2>Create an Account</h2>
        </Grid>
        <form className={classes.root} noValidate autoComplete="off">
          <FormControl className={classes.formControl} required variant={"outlined"}>
            <FormLabel className={classes.formLabel} htmlFor="email" shrink='false' name="email">Email</FormLabel>
            <OutlinedInput id="email" aria-describedby="email address" value={email} onChange={(e) => setEmail(e.target.value)} />
          </FormControl>

          <FormControl className={classes.formControl} required variant={"outlined"}>
            <FormLabel className={classes.formLabel} htmlFor="password" shrink='false' name="password">Password</FormLabel>
            <OutlinedInput id="password" aria-describedby="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </FormControl>

          {validationError ? <p style={{ color: 'red' }}>{validationError}</p> : ''}

          <Button disabled={loading} variant="contained" color="primary" className={`${classes.button} ${classes.submit}`} type="Submit" onClick={handleSubmit}>
            Signup Now
          </Button>

          <Button disabled={loading} variant="contained" color="primary" className={`${classes.button} ${classes.oAuth}`} onClick={googleSignIn}>
            <SvgIcon className={classes.icon}>
              {/* Google Icon */}
              <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z" />
                <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z" />
                <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z" />
                <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z" />
              </g>
            </SvgIcon>
            Or sign-up with Google
          </Button>

          <Grid container
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
          >
            <Grid item>
              <p>Already have an account? &nbsp;</p>
            </Grid>
            <Grid item>
              <Link href="/#/signin" variant="body2">
                Login
              </Link>
            </Grid>
          </Grid>

        </form >
      </div >
    </React.Fragment>
  );
}
