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
  image: "https://source.unsplash.com/tvc5imO5pXk/2400x1275",
  imgText: "main image description",
};

export default function LandingPage(props) {
  const classes = useStyles();

  return (
    <React.Fragment >
      <CssBaseline />
      <Container maxWidth="lg" >
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
        description="Fill your social prescription today!"
      />
    </React.Fragment>
  );
}
