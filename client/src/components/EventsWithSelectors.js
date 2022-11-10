import { useState } from "react";
import EventCard from './EventCard';
import FilterBar from './FilterBar';
import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import SearchWithGraphic from './SearchWithGraphic';
import SearchIcon from '@material-ui/icons/Search';
import EventSkeleton from './EventSkeleton'
// import { useAuth } from '../contexts/AuthContext';
// import { useHistory } from 'react-router';

export default function EventsWithSelectors(props) {
  const { title, filterBarSections } = props;
  const [isLoading, setIsLoading] = useState(false)
  const [userHasSearched, setUserHasSearched] = useState(false)
  const [eventSearchError, setEventSearchError] = useState()
  const [getLikesError] = useState()
  // const [getLikesError, _setGetLikesError] = useState()
  const [events, setEvents] = useState([]);
  const [filterSelections, setFilterSelections] = useState(() => ['All']);
  const [allEvents, setAllEvents] = useState()
  // const { currentUser } = useAuth();
  const [displayingFavorites, setDisplayingFavorites] = useState(false)
  // const history = useHistory();
  const imageSeed = Math.random() * 100

  const handleSearch = async (searchValue) => {
    setUserHasSearched(true)
    setIsLoading(true)
    setEventSearchError('')

    handleFilterSelection("", ["All"])
    setAllEvents([])
    setEvents([])

    const zipCode = await getZipFromCoordinates(searchValue)

    try {
      const response = await fetch(`/api/scrapers/getEvents/${zipCode}`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ zipCode }),
      })

      const resJson = await response.json()

      // If a non 200 response is recieved
      if (response.status !== 200) {
        const err = resJson.error
        let resMessage = ""

        // Choose error text
        switch (err) {
          case "Non-US zipcode":
            resMessage = "Please Select A Valid U.S. City"
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

  const getZipFromCoordinates = async (latlon) => {

    const { lat, lon } = latlon
    let addressComponents = []

    try {
      const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${process.env.REACT_APP_MAPS_JS_API}`, {
        method: "GET",
      })

      const resJson = await response.json()
      console.log(resJson)
      addressComponents = resJson.results[0].address_components
    }
    catch (err) {
      // If geocoding fails
      // return nothing to force a Non-US Zipcode error
      console.log(err)
      return -1
    }

    let zipCode = ""
    for (let item of addressComponents) {
      if (item.types.includes("postal_code")) {
        zipCode = item.long_name
      }
    }

    // If geocoding is successful, but no zipcode is found
    if (zipCode) {
      return zipCode
    }
    return -1
  }

  // const getLikedItems = async () => {
  //   setGetLikesError("")
  //   setIsLoading(true)
  //   // Get the user's liked items
  //   if (!currentUser) {
  //     // Redirect the user to login
  //     history.push('/signin')
  //     return
  //   }

  //   try {
  //     const response = await fetch(`/user/favorites/${currentUser.uid}`, {
  //       method: "GET",
  //       headers: { "Content-type": "application/json" },
  //     })

  //     const resJson = await response.json()

  //     const events = Object.values(resJson)

  //     setIsLoading(false)
  //     return events

  //   }
  //   catch (err) {
  //     // Show a general search failed error to the user
  //     console.log(err.message)
  //     console.log(err)

  //     setIsLoading(false)
  //     setGetLikesError(`We encountered a problem getting your liked prescriptions.`)
  //     return []
  //   }

  // }

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
      // setEvents(await getLikedItems())
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
                <EventCard key={`${index}-${event.title}-${displayingFavorites}`} sig={index + imageSeed} event={event} displayingFavorites={displayingFavorites} />
              ))}
            </Grid>
          :
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <SearchIcon fontSize='large' color="disabled" />
            <h1 style={{ margin: '50px 20px', color: '#aaaaaa' }}> Find prescriptions near you.</h1>
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
