import usePlacesAutocomplete, { getDetails } from "use-places-autocomplete";
import "@reach/combobox/styles.css";
import SearchBar from './SearchBar'

let PlaceAutoComplete = (props) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
  } = usePlacesAutocomplete({
    cache: 48 * 60 * 60,
    componentRestrictions: { country: 'us' },
  });

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const handleSelect = async (val) => {
    setValue(val, false);
  };

  const getDataFromValue = (val) => {

    for (let place of data) {
      if (place.description === val) {
        return place
      }
    }

    // If the user doesnt select a location
    // Return the first suggestion
    if (data[0]) {
      setValue(data[0].description)
      return data[0]
    }
    return 0
  }

  const getLocationCoords = async () => {
    const locationData = getDataFromValue(value)

    if (!locationData) {
      // if location data is undefined send invalid lat, lon to trigger error
      return { lat: 0, lon: 0 }
    }

    const placeObj = { placeId: locationData.place_id, fields: ["geometry"] }
    const details = await getDetails(placeObj)

    const coords = details.geometry.location
    const lat = coords.lat()
    const lon = coords.lng()

    return { lat, lon }
  }

  const submitForm = async (e) => {
    e.preventDefault()
    return props.handleSearch(await getLocationCoords())
  }

  return (
    <SearchBar
      submitForm={submitForm}
      handleSelect={handleSelect}
      handleInput={handleInput}
      ready={ready}
      value={value}
      data={data}
      status={status}
    />
  );
};

export default PlaceAutoComplete