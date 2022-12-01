import {
  Grid,
  FormControl,
  OutlinedInput,
  FormLabel,
  Button,
  Link,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import React, { useState } from "react";

const useStyles = makeStyles((theme) => ({
  modal: {
    overflow: "scroll",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  paper: {
    width: "500px",
    backgroundColor: theme.palette.background.paper,
    borderRadius: "7px",
    boxShadow: theme.shadows[4],
    padding: theme.spacing(4, 8, 4),
    margin: "40px 0",
  },
  formControl: {
    margin: "10px 0",
    width: "100%",
  },
  formLabel: {
    margin: "10px 0",
  },
  button: {
    marginTop: "15px",
    width: "100%",
    padding: "15px",
  },
  submit: {
    backgroundColor: theme.palette.bluePrimary,
    "&:hover": {
      backgroundColor: theme.palette.blueSecondary,
    },
  },
  oAuth: {
    marginBottom: "20px",
    backgroundColor: "#2d3748",
    "&:hover": {
      backgroundColor: "#2b3444",
    },
  },
  icon: {
    marginRight: "20px",
  },
  root: {
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: theme.palette.bluePrimary,
      },
    },
    "& .MuiFormLabel-root": {
      "&.Mui-focused": {
        color: theme.palette.bluePrimary,
      },
    },
  },
}));

export default function SignupForm(props) {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [validationError, setValidationError] = useState();
  const [loading, setLoading] = useState(false);
  // const { signup } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    if (password !== passwordConfirm) {
      return setValidationError("Passwords do not match");
    } else if (password.length < 6) {
      return setValidationError("Password must be at least 6 characters");
    } else if (
      name.length < 1 ||
      email.length < 1 ||
      password.length < 1 ||
      passwordConfirm.length < 1
    ) {
      return setValidationError("Please fill out all fields");
    } else {
      setValidationError("");
      await axios
        .post("/v2/auth/signup", { name, email, password })
        .then((res) => {
          setLoading(false)
          if (res.data.success) {
            window.location.href = '/'
          } else {
            setValidationError(res.data.message);
          }
        });
    }
  };

  return (
    <React.Fragment>
      <div className={classes.paper}>
        <Link href="/#/" variant="body2">
          ← Back
        </Link>
        <Grid>
          <p>Welcome,</p>
          <h2>Create an Account</h2>
        </Grid>
        <form className={classes.root} noValidate autoComplete="off">
          <FormControl
            className={classes.formControl}
            required
            variant={"outlined"}
          >
            <FormLabel
              className={classes.formLabel}
              htmlFor="name"
              shrink="false"
              name="name"
            >
              Name
            </FormLabel>
            <OutlinedInput
              id="name"
              aria-describedby="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>{" "}
          <FormControl
            className={classes.formControl}
            required
            variant={"outlined"}
          >
            <FormLabel
              className={classes.formLabel}
              htmlFor="email"
              shrink="false"
              name="email"
            >
              Email
            </FormLabel>
            <OutlinedInput
              id="email"
              aria-describedby="email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl
            className={classes.formControl}
            required
            variant={"outlined"}
          >
            <FormLabel
              className={classes.formLabel}
              htmlFor="password"
              shrink="false"
              name="password"
            >
              Password
            </FormLabel>
            <OutlinedInput
              id="password"
              aria-describedby="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <FormControl
            className={classes.formControl}
            required
            variant={"outlined"}
          >
            <FormLabel
              className={classes.formLabel}
              htmlFor="password"
              shrink="false"
              name="password"
            >
              Re-enter Password
            </FormLabel>
            <OutlinedInput
              id="re-password"
              aria-describedby="password"
              type="password"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
          </FormControl>
          {validationError ? (
            <p style={{ color: "red" }}>{validationError}</p>
          ) : (
            ""
          )}
          <Button
            disabled={loading}
            variant="contained"
            color="primary"
            className={`${classes.button} ${classes.submit}`}
            type="Submit"
            onClick={handleSubmit}
          >
            Signup Now
          </Button>
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
          >
            <Grid item>
              <p>Already have an account? &nbsp;</p>
            </Grid>
            <Grid item>
              <Link href="#/signin" variant="body2">
                Login
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </React.Fragment>
  );
}
