import usePlacesAutocomplete, { getDetails } from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from "@material-ui/core/styles";
import "@reach/combobox/styles.css";

const useStyles = makeStyles((theme) => ({
  searchBar: {
    margin: "0 auto",
    width: '100%',
    padding: '12px 12px 12px 15px',
    border: '0',
    boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);',
    fontSize: '1.2em',
    font: 'inherit',
    outline: 'none',
    borderRadius: '5px',
  },
  searchForm: {
    display: 'flex',
  },
  searchIcon: {
    position: 'absolute',
    right: '0',
    borderRadius: '5px',
    padding: '11px',
    backgroundColor: 'white',
    border: 'none',
    display: 'flex',
    alignItems: 'center'
  },
  inputWrapper: {
    width: '100%',
  },
  suggestionList: {
    width: '100%',
  },
  suggestionItem: {
    fontFamily: 'inherit',
    fontSize: '1.2em',
    fontWeight: 'bold',
  }
}))

const PlaceAutoComplete = (props) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
  } = usePlacesAutocomplete({
    cache: 48 * 60 * 60,
    componentRestrictions: { country: 'us' },
  });

  const classes = useStyles();

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
    <form onSubmit={(e) => submitForm(e)} className={classes.searchForm}>
      <Combobox onSelect={handleSelect} aria-labelledby="demo" className={classes.inputWrapper}>
        <ComboboxInput value={value} onChange={handleInput} disabled={!ready} className={classes.searchBar} placeholder="Search your location." />
        <ComboboxPopover>
          <ComboboxList className={classes.suggestionList}>
            {status === "OK" &&
              data.map(({ place_id, description }) => (
                <ComboboxOption key={place_id} value={description} className={classes.suggestionItem} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
      <button className={classes.searchIcon} type="submit"> <SearchIcon color="disabled" /> </button>
    </form>
  );
};

export default PlaceAutoComplete