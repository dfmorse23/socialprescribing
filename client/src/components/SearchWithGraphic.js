import React from "react";
import { Card, CardContent } from "@material-ui/core";
import { Paper, Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import PlaceAutoComplete from "./PlaceAutoComplete";
import SearchBar from "./SearchBar";
import useScript from "../hooks/useScript";

const useStyles = makeStyles((theme) => ({
  card: {
    overflow: "visible",
    boxShadow: "none",

  },
  titleCard: {
    padding: 0,
  },
  title: {
    position: "relative",
    color: theme.palette.common.white,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    boxShadow: "none",
    borderRadius: 0,
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,.3)",
  },
  titleGrouping: {
    position: "relative",
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(10),
    [theme.breakpoints.up("md")]: {
      paddingTop: theme.spacing(20),
      paddingBottom: theme.spacing(20),
    },
  },
  mainTitle: {
    fontWeight: "bold",
  },
  searchBarCard: {
    margin: "-24px auto 0",
    padding: 0,
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "55%",
    },
    position: "relative",
    zIndex: 1000,
  },
}));

export default function SearchWithGraphic(props) {
  const classes = useStyles();
  const { title, handleSearch } = props;
  const loaded =
    useScript(
      `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_MAPS_JS_API}&libraries=places`
    ) === "ready";

  return (
    <Card className={classes.card}>
      <CardContent className={classes.titleCard}>
        <Paper
          className={classes.title}
          style={{ backgroundImage: `url(${title.image})`, }}
        >
          <div className={classes.overlay} />
          <div className={classes.titleGrouping}>
            <Typography
              component="h1"
              variant="h4"
              color="inherit"
              align="center"
              gutterBottom
              className={classes.mainTitle}
            >
              {title.title}
            </Typography>
            <Typography
              component="h3"
              variant="subtitle2"
              color="inherit"
              paragraph
              align="center"
            >
              {title.description}
            </Typography>
          </div>
        </Paper>
      </CardContent>
      <CardContent className={classes.searchBarCard}>
        {loaded ? (
          <PlaceAutoComplete handleSearch={handleSearch} />
        ) : (
          <SearchBar />
        )}
      </CardContent>
    </Card>
  );
}

SearchWithGraphic.propTypes = {
  title: PropTypes.object,
  handleSearch: PropTypes.func,
};
