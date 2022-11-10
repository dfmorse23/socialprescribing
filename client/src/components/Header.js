import { Button, Toolbar, Link, Typography, Grid, } from "@material-ui/core";
import PropTypes from "prop-types";
import React, { useContext, useState } from "react";
import {} from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "./Modal";
import { AuthContext } from "../contexts/AuthContextnew";

const useStyles = makeStyles((theme) => ({
  // Theme for toolbar
  toolbar: {
    background: theme.palette.backgroundcolor,
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  // Theme for title 
  toolbarTitle: {
    flex: 1,
    fontWeight: "bold",
    whiteSpace: "no-wrap",
    color: theme.palette.titleColor,
    paddingRight: theme.spacing(4),
  },
  toolbarButton: {
    textAlign: "left",
    marginRight: theme.spacing(4),
  },
  // theme for sign in button and signin hover
  toolbarAuthButton: {
    backgroundColor: theme.palette.bluePrimary,
    color: 'white',
    "&:hover": {
      backgroundColor: theme.palette.blueSecondary
    },
  },
}));

const headerSections = [
  {
    title: "About",
    url: "https://socialprescribingusa.com/about.html",
    action: "url",
  },
  {
    title: "Learn More",
    url: "https://socialprescribingusa.com/about.html",
    action: "modal",
  },
];

const Header = (props) => {
  const classes = useStyles();
  const { title } = props;
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const {currentUser} = useContext(AuthContext)

  // TODO:: this needs to be responsive -- probably use grid
  return (
    <React.Fragment>
      <Toolbar className={classes.toolbar}>
        <Grid container alignItems="center" justifyContent="space-between">
          {/* Title of site ---------------- */}
          <Link href="https://socialprescribingusa.com/" underline="none">
            <Typography
              component="h2"
              variant="h5"
              color="inherit"
              align="left"
              className={classes.toolbarTitle}
            >
              {title}
            </Typography>
          </Link>
          {/* Navbar buttons --------------- */}
          <Grid>
            {headerSections.map((section) => (
              <Button
                size="medium"
                className={classes.toolbarButton}
                key={section.title}
              >
                {section.action === "url" ? (
                  <Link
                    href={section.url}
                    color="inherit"
                    key={section.title}
                    style={{ textDecoration: "none" }}
                  >
                    {section.title}
                  </Link>
                ) : (
                  <Typography
                    onClick={handleOpen}
                    variant="subtitle2"
                    color="inherit"
                    key={section.title}
                    style={{ textDecoration: "none" }}
                  >
                    {section.title}
                  </Typography>
                )}
              </Button>
            ))}
            {currentUser ? (
              <React.Fragment>
                <Link
                  className={classes.toolbarButton}
                  color="inherit"
                  href={"#"}
                  style={{ textDecoration: "none" }}
                >
                  {currentUser.email}
                </Link>
                <Button
                  size="medium"
                  className={`${classes.toolbarAuthButton} ${classes.toolbarButton}`}
                  // onClick={() => signout()}
                >
                  Logout
                </Button>
              </React.Fragment>
            ) : (
              <Button
                size="medium"
                className={`${classes.toolbarAuthButton} ${classes.toolbarButton}`}
              >
                <Link
                  color="inherit"
                  href={"#/signin"}
                  style={{ textDecoration: "none", fontWeight: "bold" }}
                >
                  Sign In
                </Link>
              </Button>
            )}
          </Grid>
        </Grid>
      </Toolbar>
      <Modal styles={{}} open={open} handleClose={handleClose}>
        <Typography variant="h6" id="modal-modal-title" component="h2">
          Onboarding modal
        </Typography>
      </Modal>
    </React.Fragment>
  );
}

Header.propTypes = {
  headerSections: PropTypes.array,
  title: PropTypes.string,
};

export default Header