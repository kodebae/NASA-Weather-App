import React, { useState, useEffect, useRef } from 'react';
import * as googleMaps from '@google/maps';
import { LatLngLiteral } from '@google/maps';

const GoogleMap = ({ apiKey, options, onMapLoad }) => {
  const [map, setMap] = useState(null);
  const mapRef = useRef(null);
  const mapsRef = useRef(null);

  useEffect(() => {
    if (!map && mapRef.current && mapsRef.current) {
      const mapOptions = {
        ...options,
        center: new googleMaps.LatLngLiteral(options.center),
      };
      const newMap = new googleMaps.Map(mapRef.current, mapOptions);
      setMap(newMap);
      onMapLoad(newMap);
    }
  }, [map, options, onMapLoad]);

  useEffect(() => {
    return () => {
      if (map) {
        map.setMap(null);
        map.dispose();
      }
    };
  }, [map]);

  useEffect(() => {
    if (apiKey && !mapsRef.current) {
      const newMaps = googleMaps;
      newMaps.KEY = apiKey;
      mapsRef.current = newMaps;
    }
  }, [apiKey]);

  return (
    <div
      ref={(ref) => {
        mapRef.current = ref;
      }}
      style={{ height: '100%', width: '100%' }}
    />
  );
};

export default GoogleMap;


