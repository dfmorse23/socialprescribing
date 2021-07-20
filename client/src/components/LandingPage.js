import { Container, CssBaseline, Grid } from '@material-ui/core';

import EventCard from './EventCard';
import FilterBar from './FilterBar';
import Footer from './Footer';
import Header from './Header';
import React from 'react';
import SearchWithGraphic from './SearchWithGraphic';

const headerSections = [
  { title: 'About', url: '#' },
  { title: 'For Healthcare Workers', url: '#' },
  { title: 'For Leaders', url: '#' },
  { title: 'Resources', url: '#' },
  { title: 'Sign In', url: '#' },
]

const filterBarSections = [
  { title: 'All', url: '#' },
  { title: 'Volunteering', url: '#' },
  { title: 'Nature', url: '#' },
  { title: 'Food', url: '#' },
  { title: 'Housing', url: '#' },
  { title: 'Goods', url: '#' },
  { title: 'Transit', url: '#' },
  { title: 'Health', url: '#' },
  { title: 'Money', url: '#' },
  { title: 'Care', url: '#' },
  { title: 'Education', url: '#' },
  { title: 'Work', url: '#' },
  { title: 'Legal', url: '#' },
  { title: 'My Favorites', url: '#' },
];

const title = {
  title: 'Social Prescribing for Self-care',
  description: 'Search 100+ curated links and resources for social prescriptions in your neighborhood',
  image: 'https://source.unsplash.com/random',
  imgText: 'main image description',
};

const events = [
  {
    title: 'Reddit',
    url: 'https://www.reddit.com/r/legaladvice',
    tag: 'legal',
    image: 'https://source.unsplash.com/random',
    imageText: 'Image Text',
  },
  {
    title: 'Find it yourself',
    url: 'https://google.ca',
    tag: 'outdoors',
    image: 'https://source.unsplash.com/random',
    imageText: 'Image Text',
  },
];

export default function LandingPage() {

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg" >
        <Header title="social prescribing." headerSections={headerSections} />
        <main>
          <SearchWithGraphic title={title} />
          <FilterBar filters={filterBarSections} />
          <Grid container spacing={4}>
            {events.map((event) => (
              <EventCard key={event.title} event={event} />
            ))}

            {events.map((event) => (
              <EventCard key={event.title} event={event} />
            ))}
            {events.map((event) => (
              <EventCard key={event.title} event={event} />
            ))}
            {events.map((event) => (
              <EventCard key={event.title} event={event} />
            ))}
            {events.map((event) => (
              <EventCard key={event.title} event={event} />
            ))}
            {events.map((event) => (
              <EventCard key={event.title} event={event} />
            ))}


          </Grid>
        </main>
      </Container>
      <Footer title="social prescribing." description="Fill your social prescription today!" />
    </React.Fragment>
  );
}
