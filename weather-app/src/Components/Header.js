import React from 'react';
import {Icon} from "@iconify/react";
import worldMap from "@iconify/icons-emojione/world-map";

function Header(_props) {
    return (
        <div className="header-bar">
            <Icon icon={worldMap} />
            <p>EONET World Weather App</p>
        </div>
    );
}

export default Header;