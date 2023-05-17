import GoogleMap from './Components/Map';
import Header from './Components/Header';
import Loader from './Components/Loader';
import Search from './Components/Search.js';
import React, {useState, useEffect} from "react";
import {useMainContext} from "./Context/Context";


function App() {
  const {setEventData, reRenderMarkers} = useMainContext(); 
  const [loading, setLoading] = useState(false);
  //Event to render
  const [renderEvent, setRenderEvent] = useState([]);

    useEffect(() => {
      const fetchEvents = async () => {
        setLoading(true);
        const res = await fetch("https://eonet.gsfc.nasa.gov/api/v3/events");
        // pulling in events field array
        const {events} = await res.json();
        // globally accessible event data, 'renderEvent' is used to render the map with markers
        setEventData(events);
        setRenderEvent(events); // changes markers
        setLoading(false);
      } 
      fetchEvents(); // created a loading component to indicate loading while fetching data

    },[]); // dependency array so only called when component mounts

    useEffect(() => {
      if(reRenderMarkers !== null){
        setRenderEvent(reRenderMarkers);
      }
    }, [reRenderMarkers]) // only change when selection is changed

  return (
    <div>
      <Header />
      {!loading ? <GoogleMap eventData={renderEvent} /> : <Loader />}
      {!loading && <Search />}
    </div>
  );
}

export default App;
//  array destructuring => "const {setEventData, reRenderMarkers} = useMainContext();" 
// renderEvents pulls in all items from events array in API