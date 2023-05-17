import React from 'react';
import {Icon} from "@iconify/react";
import fireIcon from "@iconify/icons-emojione/fire";
import volcanoIcon from "@iconify/icons-emojione/volcano";
import stormIcon from "@iconify/icons-emojione/cloud-with-lightning-and-rain";
import iceIcon from "@iconify/icons-emojione/snowflake";


function LocationMarker({onClick, id}) {
    let renderIcon = null;
    if (id === "wildfires"){
        renderIcon = fireIcon
    } else if (id === "servereStorms"){
        renderIcon = stormIcon
    } else if (id === "volcanos"){
        renderIcon = volcanoIcon
    } else if (id === "seaLakeIce"){
        renderIcon = iceIcon
    }
    return (
        <div onClick={onClick}>
            <Icon icon={renderIcon} className="location-icon" />
        </div>
    );
}

export default LocationMarker;

/**
* * This is a functional component that accepts two props, onClick and id. 
* * In the component, an icon is selected based on the value of the id prop, and that icon is rendered using the Icon component from react-icons. 
*/