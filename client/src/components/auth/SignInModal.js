import React, { useState } from 'react';
import { Modal, FormControl, OutlinedInput, FormLabel, FormControlLabel, Grid, Checkbox, Link, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router';
import { useAuth } from '../../contexts/AuthContext'

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
  root: {
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.bluePrimary,
      },
    },
    '& .MuiFormLabel-root': {
      '&.Mui-focused': {
        color: theme.palette.bluePrimary,
      },
    }
  },
}));

export default function SignInModal(props) {
  const history = useHistory();
  const classes = useStyles();
  const isOpen = props.isModalOpen || false
  const [rememberMe, setRememberMe] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [validationError, setValidationError] = useState()
  const [loading, setLoading] = useState(false)
  // const { login } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setValidationError('')
      setLoading(true)

      // await login(email, password, rememberMe)

      history.push('/#')

    } catch (err) {
      console.log(err)
      setValidationError('Invalid credentials. Please try again.')
    }

    setLoading(false)
  }

  const body = (
    <div className={classes.paper}>
      <Grid>
        <p>Welcome back</p>
        <h2>Login to your account</h2>
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

        <Grid container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item>
            <FormControlLabel
              control={
                <Checkbox checked={rememberMe} color="default" onChange={(e) => setRememberMe(Boolean(e.target.checked))} name="rememberMe" />
              }
              label="Remember Me"
            />
          </Grid>

          <Grid item>
            <Link href="/#/forgotpassword" variant="body2">
              Forgot Password?
            </Link>
          </Grid>
        </Grid>

        <Button disabled={loading} variant="contained" color="primary" className={`${classes.button} ${classes.submit}`} type="Submit" onClick={handleSubmit}>
          Login Now
        </Button>

        <Grid container
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
        >
          <Grid item>
            <p>Don't have an account? &nbsp;</p>
          </Grid>
          <Grid item>
            <Link href="/#/signup/" variant="body2">
              Join Today
            </Link>
          </Grid>
        </Grid>

      </form >
    </div >
  );

  return (
    <div>
      <Modal
        open={isOpen}
        className={classes.modal}
        onClose={() => history.push("/#")}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}