import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon, InlineIcon } from '@iconify/react';
import worldMap from '@iconify/icons-emojione/world-map';
import fireBoldDuotone from '@iconify/icons-solar/fire-bold-duotone';
import cloudStormBoldDuotone from '@iconify/icons-solar/cloud-storm-bold-duotone';
import twotoneVolcano from '@iconify/icons-ic/twotone-volcano';
import './index.css';

function App() {
  const [events, setEvents] = useState([]);
  const [selectedWeather, setSelectedWeather] = useState('');
  const [activeEvent, setActiveEvent] = useState(null);

  useEffect(() => {
    axios
      .get('https://eonet.gsfc.nasa.gov/api/v3/events')
      .then((response) => setEvents(response.data.events))
      .catch((error) => console.log(error));
  }, []);

  const handleWeatherSelection = (weather) => setSelectedWeather(weather);

  const filteredEvents = selectedWeather
    ? events.filter((event) => event.categories[0].id === selectedWeather)
    : events;

  const handleWeatherChange = (event) => {
    const selectedOption = event.target.value;
    setSelectedWeather(selectedOption);
    handleWeatherSelection(selectedOption);
  };

  const weatherIcons = [
    { value: 'Wildfires', icon: fireBoldDuotone },
    { value: 'Severe Storms', icon: cloudStormBoldDuotone },
    { value: 'Volcanoes', icon: twotoneVolcano },
  ];

  return (
    <div className="App">
      {/* Header Component */}
      <div className="header-bar">
        <Icon icon={worldMap} className="header-icon" />
        <h1 className="header-title">NASA EONET World Weather App</h1>
        <select
          value={selectedWeather}
          onChange={handleWeatherChange}
          className="weather-dropdown"
        >
          <option value="">All</option>
          {weatherIcons.map((weatherIcon) => (
            <option value={weatherIcon.value} key={weatherIcon.value}>
              <InlineIcon
                icon={weatherIcon.icon}
                className="weather-icon"
              />
              {weatherIcon.value}
            </option>
          ))}
        </select>
      </div>

      {/* MapContainer Component */}
      <MapContainer
        center={[0, 0]}
        zoom={3}
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
            onClick={() => {
              setActiveEvent(event);
            }}
          />
        ))}

        {activeEvent && (
          <Popup
            position={[
              activeEvent.geometry[0].coordinates[1],
              activeEvent.geometry[0].coordinates[0],
            ]}
            onClose={() => {
              setActiveEvent(null);
            }}
          >
            <div>
              <h2>{activeEvent.categories.title}</h2>
            </div>
          </Popup>
        )}
      </MapContainer>
    </div>
  );
}

export default App;
