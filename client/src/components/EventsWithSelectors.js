import { useState } from "react";
import EventCard from './EventCard';
import FilterBar from './FilterBar';
import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import SearchWithGraphic from './SearchWithGraphic';
import SearchIcon from '@material-ui/icons/Search';
import EventSkeleton from './EventSkeleton'
import { useAuth } from '../contexts/AuthContext';
import { useHistory } from 'react-router';

export default function EventsWithSelectors(props) {
  const { title, filterBarSections } = props;
  const [isLoading, setIsLoading] = useState(false)
  const [userHasSearched, setUserHasSearched] = useState(false)
  const [eventSearchError, setEventSearchError] = useState()
  const [events, setEvents] = useState([]);
  const [filterSelections, setFilterSelections] = useState(() => ['All']);
  const [allEvents, setAllEvents] = useState()
  const { currentUser } = useAuth();
  const [displayingFavorites, setDisplayingFavorites] = useState(false)
  const history = useHistory();

  const handleSearch = async (searchValue) => {
    setUserHasSearched(true)
    setIsLoading(true)
    setEventSearchError('')

    setAllEvents([])
    setEvents([])

    try {
      const response = await fetch(`http://localhost:3001/api/scrapers/getEvents/${searchValue}`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ searchValue }),
      })

      const resJson = await response.json()
      let eventList = []

      resJson.forEach((category) => {
        const events = Object.values(category)[0]
        eventList = eventList.concat(events)
      })

      setEvents(eventList)
      setAllEvents(eventList)
    }
    catch (err) {
      // Show a general search failed error to the user
      console.log(err.message)
      console.log(err)

      setEventSearchError(`We encountered a problem getting your prescriptions. Err: ${err.message}`)
    }

    setIsLoading(false)
  };

  const getLikedItems = async () => {
    setIsLoading(true)
    // Get the user's liked items
    if (!currentUser) {
      // Redirect the user to login
      history.push('/signin')
      return
    }

    try {
      const response = await fetch(`http://localhost:3001/user/favorites/${currentUser.uid}`, {
        method: "GET",
        headers: { "Content-type": "application/json" },
      })
      const resJson = await response.json()

      const events = Object.values(resJson)

      setIsLoading(false)
      return events

    }
    catch (err) {
      // Show a general search failed error to the user
      console.log(err.message)
      console.log(err)

      setEventSearchError(`We encountered a problem getting your liked prescriptions.`)
    }

  }

  const handleFilterSelection = async (e, newSelections) => {
    // take the difference between newSelections and filterSelection (newSelections - filterSelections)
    // to see if 'All' has been added
    setDisplayingFavorites(false)
    if (!allEvents) {
      return
    }

    const difference = newSelections.filter((x) => !filterSelections.includes(x));

    // if there is nothing selected or all is selected display all events
    if (newSelections.length === 0 || difference.includes("All")) {
      newSelections = ["All"];
      setEvents(allEvents);
    }
    // If the user selects favorites, deselect all and get favorites
    else if (difference.includes("My Favorites")) {
      newSelections = ["My Favorites"];

      setDisplayingFavorites(true)
      setEvents([])
      setEvents(await getLikedItems())
    }
    else {
      // remove 'All' from the selected filters if present
      const all = newSelections.indexOf("All");
      if (all > -1) {
        newSelections.splice(all, 1);
      }

      const favorite = newSelections.indexOf("My Favorites");
      if (favorite > -1) {
        newSelections.splice(favorite, 1);
        setEvents([])
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
          disabled={!userHasSearched}
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
              {events.map((event, index) => (
                <EventCard key={index} sig={index} event={event} displayingFavorites={displayingFavorites} />
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
