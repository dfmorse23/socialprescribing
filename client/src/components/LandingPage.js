import { Container, CssBaseline } from "@material-ui/core";

import EventsWithSelectors from "./EventsWithSelectors";
import Footer from "./Footer";
import Header from "./Header";
import SignInModal from "./SignInModal";
import React from "react";

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
  title: "Social Prescribing for Self-care",
  description:
    "Search 100+ curated links and resources for social prescriptions in your neighborhood",
  image: "https://source.unsplash.com/tvc5imO5pXk/2400x1275",
  imgText: "main image description",
};

export default function LandingPage(props) {
  const isModalOpen = props.signin;

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="social prescribing." />
        <SignInModal isModalOpen={isModalOpen} />
        <main>
          <EventsWithSelectors
            title={title}
            filterBarSections={filterBarSections}
          />
        </main>
      </Container>
      <Footer
        title="social prescribing."
        description="Fill your social prescription today!"
      />
    </React.Fragment>
  );
}
