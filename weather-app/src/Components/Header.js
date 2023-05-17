import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import worldMap from '@iconify/icons-emojione/world-map';
import '../index.css';

function Header({ onSelectWeather }) {
  const [selectedWeather, setSelectedWeather] = useState('');

  const handleWeatherChange = (event) => {
    const selectedOption = event.target.value;
    setSelectedWeather(selectedOption);
    onSelectWeather(selectedOption);
  };

  return (
    <div className="header-bar">
      <Icon icon={worldMap} className="header-icon" />
      <h1 className="header-title">NASA EONET World Weather App</h1>
      <select
        value={selectedWeather}
        onChange={handleWeatherChange}
        className="weather-dropdown"
      >
        <option value="">Select Weather</option>
        <option value="wildfires">Wildfires</option>
        <option value="storms">Storms</option>
        <option value="volcanoes">Volcanoes</option>
        {/* Add more options as needed */}
      </select>
    </div>
  );
}

export default Header;

/**
*TODO: Need to update the markers for the images. 
*/
