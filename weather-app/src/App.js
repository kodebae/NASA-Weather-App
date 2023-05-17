import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Header from './Components/Header';

function App() {
  const [events, setEvents] = useState([]);
  const [selectedWeather, setSelectedWeather] = useState('');

  useEffect(() => {
    axios
      .get('https://eonet.gsfc.nasa.gov/api/v3/events')
      .then((response) => {
        setEvents(response.data.events);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleWeatherSelection = (weather) => {
    setSelectedWeather(weather);
  };

  const filteredEvents = selectedWeather
    ? events.filter((event) => event.categories[0].id === selectedWeather)
    : events;

  return (
    <div className="App">
      <Header onSelectWeather={handleWeatherSelection} />
      <MapContainer
        center={[0, 0]}
        zoom={2}
        style={{ height: '100vh', width: '100vw' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="Map data © <a href='https://openstreetmap.org'>OpenStreetMap</a> contributors"
        />
        {filteredEvents.map((event) => (
          <Marker
            key={event.id}
            position={[
              event.geometry[0].coordinates[1],
              event.geometry[0].coordinates[0],
            ]}
          >
            <Popup>{event.title}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default App;

