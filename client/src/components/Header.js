import { Button, Toolbar, Link, Typography, Grid, Box } from "@material-ui/core";
import PropTypes from "prop-types";
import React, { useState } from "react";
import {} from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { useAuth } from "../contexts/AuthContext";
import Modal from "./Modal";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    background: theme.palette.beige3,
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
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
  toolbarAuthButton: {
    backgroundColor: theme.palette.green1,
    color: "white",
    "&:hover": {
      backgroundColor: "#17b08e",
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

export default function Header(props) {
  const classes = useStyles();
  const { title } = props;
  const { currentUser, signout } = useAuth();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
                    variant="p"
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
                  onClick={() => signout()}
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
