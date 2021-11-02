import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@material-ui/core";
import { Paper, Typography } from "@material-ui/core";

import SearchIcon from '@material-ui/icons/Search';
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  card: {
    overflow: "visible",
    boxShadow: "none",
    backgroundColor: "inherit",
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
  searchBar: {
    margin: "0 auto",
    width: '100%',
    padding: '12px 12px 12px 15px',
    border: '0',
    boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);',
    fontSize: '1.2em',
    font: 'inherit',
    outline: 'none',
    borderRadius: '5px',
  },
  searchForm: {
    display: 'flex',
  },
  searchIcon: {
    position: 'absolute',
    right: '0',
    borderRadius: '5px',
    padding: '12px',
    backgroundColor: 'white',
    border: 'none',
    display: 'flex',
    alignItems: 'center'
  },
}))

let autoComplete;

const loadScript = (url, callback) => {
  if (!document.querySelector('#mapsAPI')) {
    let script = document.createElement("script");
    script.type = "text/javascript";

    if (script.readyState) {
      script.onreadystatechange = function () {
        if (script.readyState === "loaded" || script.readyState === "complete") {
          script.onreadystatechange = null;
          callback();
        }
      };
    } else {
      script.onload = () => callback();
    }

    script.src = url;
    script.id = 'mapsAPI'
    document.getElementsByTagName("head")[0].appendChild(script);
    return
  }
  callback()
};

const handleScriptLoad = (updateQuery, autoCompleteRef) => {
  autoComplete = new window.google.maps.places.Autocomplete(
    autoCompleteRef.current,
    { types: ["(cities)"], componentRestrictions: { country: "us" } }
  );
  autoComplete.setFields(["address_components", "formatted_address"]);
  autoComplete.addListener("place_changed", () => {
    handlePlaceSelect(updateQuery)
  }
  );
}

const handlePlaceSelect = async (updateQuery) => {
  const addressObject = autoComplete.getPlace()
  const q = addressObject.formatted_address
  if (q) {
    updateQuery(q);
  }
}

export default function SearchWithGraphic(props) {
  const classes = useStyles();
  const { title, handleSearch } = props;
  const [searchValue, setSearchValue] = useState("");

  const autoCompleteRef = useRef(null);

  useEffect(() => {
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=places`,
      () => handleScriptLoad(setSearchValue, autoCompleteRef)
    );
  }, []);

  // TODO:: use the search bar onRequestSearch to populate results
  return (
    <Card className={classes.card}>
      <CardContent className={classes.titleCard}>
        <Paper className={classes.title} style={{ backgroundImage: `url(${title.image})` }}>
          {<img style={{ display: "none" }} src={title.image} alt={title.imageText} />}
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
            <Typography component="h3" variant="subtitle2" color="inherit" paragraph align="center">
              {title.description}
            </Typography>
          </div>
        </Paper>
      </CardContent>
      <CardContent className={classes.searchBarCard}>
        <form onSubmit={() => { handleSearch(searchValue) }} className={classes.searchForm}>
          <input
            type="text"
            className={classes.searchBar}
            ref={autoCompleteRef}
            onChange={event => {
              setSearchValue(event.target.value)
            }}
            placeholder="Search for a location..."
            value={searchValue}
          />
          <button className={classes.searchIcon} type="submit"> <SearchIcon color="disabled" /> </button>
        </form>
      </CardContent>
    </Card>
  );
}

SearchWithGraphic.propTypes = {
  title: PropTypes.object,
  handleSearch: PropTypes.func,
};
