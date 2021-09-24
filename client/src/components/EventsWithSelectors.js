import { useEffect, useRef, useState } from "react";

import EventCard from './EventCard';
import FilterBar from './FilterBar';
import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import SearchWithGraphic from './SearchWithGraphic';
import SearchIcon from '@material-ui/icons/Search';
import get_dummy_data from './get_dummy_data';
import EventSkeleton from './EventSkeleton'

export default function EventsWithSelectors(props) {
  const { title, filterBarSections } = props;
  const [isLoading, setIsLoading] = useState(false)
  const [userHasSearched, setUserHasSearched] = useState(false)
  const [events, setEvents] = useState([]);
  const [filterSelections, setFilterSelections] = useState(() => ["All"]);
  let allEvents = useRef([]);

  const handleSearch = async (searchValue) => {
    setUserHasSearched(true)
    setIsLoading(true)

    try {
      const response = await fetch(`http://localhost:3001/api/scrapers/getEvents/${searchValue}`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ searchValue }),
      })
        .then((res) => {
          res.json()
            .then(data => console.log(data))
        })
        .catch((err) => {
          console.log(err);
          reject(err);
          return;
        });
    });
  };

  const handleFilterSelection = (e, newSelections) => {
    // take the difference between newSelections and filterSelection (newSelections - filterSelections)
    // to see if 'All' has been added
    const difference = newSelections.filter((x) => !filterSelections.includes(x));

    // if there is nothing selected or all is selected display all events
    if (newSelections.length === 0 || difference.includes("All")) {
      newSelections = ["All"];
      setEvents(allEvents.current);
    } else {
      // remove 'All' from the selected filters if present
      const index = newSelections.indexOf("All");
      if (index > -1) {
        newSelections.splice(index, 1);
      }

      // filter for events that match the selected tags
      const newEvents = allEvents.current.filter((event) => newSelections.includes(event.tag));
      setEvents(newEvents);
    }

    setFilterSelections(newSelections);
  };

  // initial render event
  useEffect(() => {
    allEvents.current = get_dummy_data();
    setEvents(allEvents.current);
  }, []);

  return (
    <React.Fragment>
      <div style={{ marginBottom: '50px' }}>
        <SearchWithGraphic title={title} handleSearch={handleSearch} />
        <FilterBar
          filterBarSections={filterBarSections}
          filterSelections={filterSelections}
          handleSelection={handleFilterSelection}
        />
        {userHasSearched ?
          isLoading ?
            <Grid container spacing={4} >
              <EventSkeleton />
              <EventSkeleton />
              <EventSkeleton />
              <EventSkeleton />
            </Grid>
            :
            <Grid container spacing={4} >
              {events.map((event) => (
                <EventCard key={event.title} event={event} />
              ))}
            </Grid>
          :
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <SearchIcon fontSize='large' />
            <h1 style={{ margin: '200px 20px' }}> Search your ZIP code</h1>
          </Grid>
        }
      </div>
    </React.Fragment >
  );
}

EventsWithSelectors.propTypes = {
  title: PropTypes.object,
  filterBarSections: PropTypes.object,
};
