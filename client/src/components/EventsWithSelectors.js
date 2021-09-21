import { useEffect, useRef, useState } from "react";

import EventCard from "./EventCard";
import FilterBar from "./FilterBar";
import { Grid } from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";
import SearchWithGraphic from "./SearchWithGraphic";
import get_dummy_data from "./get_dummy_data";

export default function EventsWithSelectors(props) {
	const { title, filterBarSections } = props;
	const [events, setEvents] = useState([]);
	const [filterSelections, setFilterSelections] = useState(() => ["All"]);
	let allEvents = useRef([]);

	// todo:: make request and update events on search here
	const handleSearch = (searchValue) => {
		return new Promise((resolve, reject) => {
			fetch(`http://localhost:3001/api/scrapers/getEvents/${searchValue}`, {
				crossDomain: true,
				method: "POST",
				headers: { "Content-type": "application/json" },
				body: JSON.stringify({ searchValue }),
			})
				.then((res) => {
					resolve(res.json());
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
			{/* Jackie: Edit the handleSearch function with the query you import from api */}
			<SearchWithGraphic title={title} handleSearch={handleSearch} />
			<FilterBar
				filterBarSections={filterBarSections}
				filterSelections={filterSelections}
				handleSelection={handleFilterSelection}
			/>
			<Grid container spacing={4}>
				{events.map((event) => (
					<EventCard key={event.title} event={event} />
				))}
			</Grid>
		</React.Fragment>
	);
}

EventsWithSelectors.propTypes = {
	title: PropTypes.object,
	filterBarSections: PropTypes.object,
};
