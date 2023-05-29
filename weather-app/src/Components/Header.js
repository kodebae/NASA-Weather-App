import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import worldMap from '@iconify/icons-emojione/world-map';
import fireBoldDuotone from '@iconify/icons-solar/fire-bold-duotone';
import cloudStormBoldDuotone from '@iconify/icons-solar/cloud-storm-bold-duotone';
import twotoneVolcano from '@iconify/icons-ic/twotone-volcano';
import 'leaflet/dist/leaflet.css';
import '../index.css';

function Header({ onSelectWeather }) {
  const [selectedWeather, setSelectedWeather] = useState('');

  const handleWeatherChange = (event) => {
    const selectedOption = event.target.value;
    setSelectedWeather(selectedOption);
    onSelectWeather(selectedOption);
  };

  const weatherIcons = [
    { value: "Wildfires", icon: fireBoldDuotone },
    { value: "Severe Storms", icon: cloudStormBoldDuotone },
    { value: "Volcanoes", icon: twotoneVolcano }
  ];

  return (
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
            {weatherIcon.value}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Header;


/**
*TODO: Troubleshoot why icons are not showing up in dropdown. 
*/