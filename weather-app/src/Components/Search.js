import React, { useRef, useState, useEffect } from 'react';
//Main Context
import { useMainContext } from '../Context/Context';

function Search(props) {
    const { eventData, setSelectedEvent, setReRenderMarkers } = useMainContext();
    const searchBox = useRef();
    const optionBox = useRef();

    // matching results
    const [matchEvent, setMatchEvent] = useState(eventData); // how we get access to the data frim the API

    // handle dropDown
    const [storeSelection, setStoreSelection] = useState("All");

    // filter eventData
    const filterEventData = eventData => {
        // spread operator so we don't overwrite reference data, copying new array
        let filteredEventData = [...eventData];
        if (storeSelection !== "All") {
            filteredEventData = filteredEventData.filter(event => event.categories[0].title === storeSelection);
        }
        return filteredEventData;
    }

    const userSearch = (searchQuery, eventData) => {
        let eventMatch = [];
        let filteredEventData = filterEventData(eventData);
        if (searchQuery.length > 0 && filteredEventData) {
            for (const event in eventData) {
                let eventTitle = filteredEventData[event].title.toLowerCase(); // match it up with the search query
                if (eventTitle.indexOf(searchQuery) !== -1) {
                    eventMatch.push(filteredEventData[event]);
                }
            }

            // if user types in something that didn't match
            if (eventMatch.length === 0) {
                eventMatch = [{ title: "No Results!", categories: [{ title: "" }] }] // formated from NASA API
            }
            setMatchEvent(eventMatch);
        } else {
            setMatchEvent(filteredEventData);
        }
    }

    // user has changed their filter option we want the markers to change too
    useEffect(() => {
        // first we want to change the Markers
        let filteredEventData = filterEventData(eventData);
        setReRenderMarkers(filteredEventData);

        // now we want to change the search results
        userSearch(searchBox.current.value.toLowerCase(), filteredEventData);
    }, [storeSelection])



    return (
        <div>
            <section className="option-container">
                <p>Type:</p>
                <select ref={optionBox}
                    onChange={() => setStoreSelection(optionBox.current.value)}>
                    <option value="All">All</option>
                    <option value="Wildfires">Wildfires</option>
                    <option value="Severe Storms">Severe Storms</option>
                    <option value="Volcanoes">Volcanoes</option>
                    <option value="Sea and Lake Ice">Sea and Lake Ice</option>
                </select>
            </section>
            <section className="search-container">
                <p>Search:</p>
                <input type="text" onKeyUp={() => {
                    let searchQuery = searchBox.current.value.toLowerCase(); // caps not evaluated
                    // want to wait for the user to finish typing before sending method to keep table from reloading constantly
                    setTimeout(() => {
                        if (searchQuery === searchBox.current.value.toLowerCase()) {
                            userSearch(searchQuery, eventData);
                        }
                    }, 300)

                }
                } ref={searchBox} />
            </section>

            <table className="search-table">
                <tbody>
                    <tr>
                        <th style={{ width: "60%" }}>Title</th>
                        <th>Type</th>
                        <th>Location</th>
                    </tr>

                    {matchEvent.map(ev => {
                        return (
                            <tr key={ev.id}>
                                <td>{ev.title}</td>
                                <td>{ev.categories[0].title}</td>
                                {
                                    ev.categories[0].title
                                        ? <td>
                                            <a href="#" onClick={() => { setSelectedEvent(ev) }}>Click Here</a>
                                        </td>
                                        : <td></td>
                                }
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            </div>
            );
    }

export default Search

/**
* TODO: Add comments to clarify what certain lines of code are doing
* TODO: Break up the larger function into smaller, reusable functions to improve readability and maintainability
* TODO: Add error handling for cases where the API call fails or the search returns no results
* TODO: Instead of using ref to get the current value of searchBox or optionBox, use useState to store their values and update them onClick or onChange respectively.
 */