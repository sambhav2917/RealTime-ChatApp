import React from "react";
import "./Loading.css";
import TrophySpin  from "react-loading-indicators/TrophySpin";

const Loading = () => (
    <div className="loading-container">
        <TrophySpin color="#3064f2" size="medium" text="" textColor="" />
    </div>
	
);

export default Loading;