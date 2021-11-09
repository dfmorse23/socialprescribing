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
import ReactGA from 'react-ga';

export default function EventsWithSelectors(props) {
  const { title, filterBarSections } = props;
  const [isLoading, setIsLoading] = useState(false)
  const [userHasSearched, setUserHasSearched] = useState(false)
  const [eventSearchError, setEventSearchError] = useState()
  const [getLikesError, setGetLikesError] = useState()
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

    handleFilterSelection("", ["All"])
    setAllEvents([])
    setEvents([])

    try {
      const response = await fetch(`http://localhost:3001/api/scrapers/getEvents/${searchValue}`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ searchValue }),
      })

      // Send search location analytics
      ReactGA.event({
        category: 'Search',
        action: 'Searched for events',
        value: searchValue
      });

      const resJson = await response.json()

      // If a non 200 response is recieved
      if (response.status !== 200) {
        const err = resJson.error
        let resMessage = ""

        // Choose error text
        switch (err) {
          case "Non-US zipcode":
            resMessage = "Please enter a valid US zipcode."
            break;
          default:
            resMessage = `We encountered an error and were unable to retrieve events. Error: ${err}`
        }

        // Change error text
        setEventSearchError(resMessage)
        setIsLoading(false)
        return
      }

      // Get events from response and add them to the event list
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

      setEventSearchError(`Unable to connect to our event servers. Check your internet connection.`)
    }

    setIsLoading(false)
  };

  const getLikedItems = async () => {
    setGetLikesError("")
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

      setIsLoading(false)
      setGetLikesError(`We encountered a problem getting your liked prescriptions.`)
      return []
    }

  }

  const handleFilterSelection = async (e, newSelections) => {
    setDisplayingFavorites(false)

    if (!allEvents && !newSelections.includes("My Favorites")) {
      setFilterSelections(newSelections)
      return
    }

    // take the difference between newSelections and filterSelection (newSelections - filterSelections)
    // to see if 'All' has been added
    const difference = newSelections.filter((x) => !filterSelections.includes(x));

    // if there is nothing selected or all is selected display all events
    if (newSelections.length === 0 || difference.includes("All")) {
      newSelections = ["All"];
      setEvents(allEvents || []);
    }
    // If the user selects favorites, deselect all and get favorites
    else if (difference.includes("My Favorites")) {
      newSelections = ["My Favorites"];
      setDisplayingFavorites(true)
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
      setEvents(newEvents || []);
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
        {displayingFavorites ? "" : <h2 style={{ margin: '50px 20px', color: '#ff5031', textAlign: 'center' }}>{eventSearchError}</h2>}
        {!displayingFavorites ? "" : <h2 style={{ margin: '50px 20px', color: '#ff5031', textAlign: 'center' }}>{getLikesError}</h2>}
        {userHasSearched || displayingFavorites ?
          isLoading ?
            <Grid container spacing={4} >
              <EventSkeleton />
              <EventSkeleton />
              <EventSkeleton />
              <EventSkeleton />
            </Grid>
            :
            <Grid container spacing={4} >
              {events && events.map((event, index) => (
                <EventCard key={`${index}-${event.title}-${displayingFavorites}`} sig={index} event={event} displayingFavorites={displayingFavorites} />
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
