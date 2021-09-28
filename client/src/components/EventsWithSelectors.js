import { useState } from "react";
import EventCard from './EventCard';
import FilterBar from './FilterBar';
import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import SearchWithGraphic from './SearchWithGraphic';
import SearchIcon from '@material-ui/icons/Search';
import EventSkeleton from './EventSkeleton'

export default function EventsWithSelectors(props) {
  const { title, filterBarSections } = props;
  const [isLoading, setIsLoading] = useState(false)
  const [userHasSearched, setUserHasSearched] = useState(false)
  const [eventSearchError, setEventSearchError] = useState()
  const [events, setEvents] = useState([]);
  const [filterSelections, setFilterSelections] = useState(() => ['All']);
  const [allEvents, setAllEvents] = useState()

  const handleSearch = async (searchValue) => {
    setUserHasSearched(true)
    setIsLoading(true)

    try {
      const response = await fetch(`http://localhost:3001/api/scrapers/getEvents/${searchValue}`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ searchValue }),
      })

      const resJson = await response.json()
      console.log([...resJson[0].EventBrite, ...resJson[1].Volunteering])
      setAllEvents([...resJson[0].EventBrite, ...resJson[1].Volunteering])
      setEvents([...resJson[0].EventBrite, ...resJson[1].Volunteering])
    }
    catch (err) {
      // Show a general search failed error to the user
      setEventSearchError('We encountered a problem getting your prescriptions.')
    }

    setIsLoading(false)
  };

  const handleFilterSelection = (e, newSelections) => {
    // take the difference between newSelections and filterSelection (newSelections - filterSelections)
    // to see if 'All' has been added
    const difference = newSelections.filter((x) => !filterSelections.includes(x));

    // if there is nothing selected or all is selected display all events
    if (newSelections.length === 0 || difference.includes("All")) {
      newSelections = ["All"];
      setEvents(allEvents);
    } else {
      // remove 'All' from the selected filters if present
      const index = newSelections.indexOf("All");
      if (index > -1) {
        newSelections.splice(index, 1);
      }

      // filter for events that match the selected tags
      const newEvents = allEvents.filter((event) => newSelections.includes(event.tag));
      setEvents(newEvents);
    }

    setFilterSelections(newSelections);
  };

  return (
    <React.Fragment>
      <div style={{ marginBottom: '50px' }}>
        <SearchWithGraphic title={title} handleSearch={handleSearch} />
        <FilterBar
          filterBarSections={filterBarSections}
          filterSelections={filterSelections}
          handleSelection={handleFilterSelection}
        />
        <h2 style={{ margin: '50px 20px', color: '#ff5031', textAlign: 'center' }}>{eventSearchError}</h2>
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
            <h1 style={{ margin: '50px 20px' }}> Search your ZIP code</h1>
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
