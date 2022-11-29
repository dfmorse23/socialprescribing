import { Container, CssBaseline, makeStyles } from "@material-ui/core";

import EventsWithSelectors from "../components/event/EventsWithSelectors";
import Footer from "../components/Footer";
import Header from "../components/Header";
import React from "react";

const useStyles = makeStyles((theme) => ({
  picture: {
    // borderRadius: "200px",
    // width: "200px",
    // height: "200px",
    // margin: "auto",
    marginTop: "20px",
  },
}));

const filterBarSections = {
  all: "All",
  favorites: "My Favorites",
  filters: [
    "Care",
    "Education",
    "Food",
    "Goods",
    "Health",
    "Housing",
    "Legal",
    "Money",
    "Nature",
    "Transit",
    "Volunteering",
    "Work",
  ],
};

const title = {
  title: "Find a Social Prescription",
  description:
    "Take control of your wellness by finding local resources and community activities that can help you thrive. Search 100+ curated links and resources for social prescriptions in your neighbourhood.",
  // image: require("../images/bg.jpg"),
  image:
    "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1138&q=80",
  imgText: "main image description",
};

export default function LandingPage(props) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="social prescribing usa." />
        {/* <main> */}
        <EventsWithSelectors
          // borderRadius="10"
          title={title}
          filterBarSections={filterBarSections}
          className={classes.picture}
        />
        {/* </main> */}
      </Container>
      <Footer
        title="social prescribing usa."
        // description="Fill your social prescription today!"gi
      />
    </React.Fragment>
  );
}
