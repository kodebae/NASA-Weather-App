import React, {useState, useRef, useEffect} from 'react';
import GoogleMapReact from 'google-map-react';
import useSuperCluster from 'use-supercluster';


function Map({center, eventData}) {

    const [zoom, setZoom] = useState(2); // set up in state so this can be configured during user interaction
    return (
        <div className="map-container">
            <GoogleMapReact
                bootstrapURLKeys={{key: process.env.REACT_APP_GOOGLE_KEY}}
                center={center}
                zoom={zoom}> 
            </GoogleMapReact>
        </div>
    );
}

Map.defaultProps = {
    center: {
        lat: 35.2082,
        lng: 82.2384
    }
} // lat and long coordinates for Tryon NC

export default Map;

// Google Map React is not a self closing container.