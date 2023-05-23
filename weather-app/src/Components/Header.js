import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import worldMap from '@iconify/icons-emojione/world-map';
import { WiFire, WiDayThunderstorm, WiVolcano } from 'react-icons/wi';
import '../index.css';

function Header({ onSelectWeather }) {
  const [selectedWeather, setSelectedWeather] = useState('');

  const handleWeatherChange = (event) => {
    const selectedOption = event.target.value;
    setSelectedWeather(selectedOption);
    onSelectWeather(selectedOption);
  };

  const weatherIcons = [
    { value: "Wildfires", icon: <WiFire/> },
    { value: "Severe Storms", icon: <WiDayThunderstorm/> },
    { value: "Volcanos", icon: <WiVolcano/> }
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
          <option value={weatherIcon.value} key={weatherIcon.icon}>
            {weatherIcon.value}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Header;



/**
*TODO: Need to update the markers for the images. 
*/

// { value: "select weather", icon: <WiDaySunny/> },